import React, { useEffect, useState } from "react";
import Blog from "../Blog/blog";
import CreateBlog from "../CreateBlog/createBlog";
import { useToken } from "../../TokenContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

function BlogContainer() {
  const [blogs, setBlogs] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  // const { token } = useToken();
  const navigate = useNavigate();
  const [updateContent, setUpdateContent] = useState("");
  const [updateKey, setUpdateKey] = useState("");
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false); // Track the update form state
  const [userId, setUserId] = useState("");
  const baseUrl = "http://localhost:5000";

  const token = localStorage.getItem("access");

  useEffect(() => {
    axios
      .get(`${baseUrl}/blog/get`)
      .then((response) => {
        setBlogs(response.data.result);
        const d_Token = jwt_decode(token);
        console.log(d_Token);
        setUserId(d_Token.userid);
        console.log(d_Token.userid);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleCreate = (blog) => {
    setBlogs([...blogs, blog]);
    setShowCreateForm(false);
  };

  const handleDelete = async (id) => {
    try {
      const updatedBlogs = blogs.filter((blog) => blog.userid !== userId);
      await axios.delete(`${baseUrl}/blog/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setBlogs(updatedBlogs);
      setUpdateContent("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdate = (id, content) => {
    // Toggle the update form state
    setIsUpdateFormOpen(!isUpdateFormOpen);
    setUpdateKey(id);
    setUpdateContent(content);
  };

  const handleShowCreateForm = () => {
    if (!token) {
      navigate("/login");
    } else {
      setShowCreateForm(true);
    }
  };

  const handleCloseCreateForm = (response, content, key) => {
    if (key == "Update") {
      const updatedBlogs = blogs.map((blog) => {
        if (blog.blogid == updateKey) {
          blog.content = content;
        }
        return blog;
      });

      setBlogs(updatedBlogs);
    }

    console.log(key);

    if (key == "Create") {
      const blogId = response.data.result.insertId;

      const blog = {
        blogid: blogId,
        userid: userId,
        content,
      };

      setBlogs([...blogs, blog]);
    }

    setShowCreateForm(false);
    setIsUpdateFormOpen(false);
  };

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h2>Blogs</h2>
        <button className="create-button" onClick={handleShowCreateForm}>
          Create Blog
        </button>
      </div>
      {showCreateForm || isUpdateFormOpen ? (
        <CreateBlog
          onCreate={handleCreate}
          onClose={(response, content, key) =>
            handleCloseCreateForm(response, content, key)
          }
          initialContent={updateContent}
        />
      ) : (
        blogs.map((blog) => (
          <Blog
            key={blog.blogid}
            id={blog.blogid}
            content={blog.content}
            onDelete={token && userId === blog.userid ? handleDelete : null}
            onUpdate={
              token && userId === blog.userid
                ? () => handleUpdate(blog.blogid, blog.content)
                : null
            }
          />
        ))
      )}
    </div>
  );
}

export default BlogContainer;
