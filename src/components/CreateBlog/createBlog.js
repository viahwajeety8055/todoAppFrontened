// src/CreateBlog.js
import React, { useState } from "react";
import axios from "axios";
import "./createBlog.css";
import { useToken } from "../../TokenContext";

function CreateBlog({ onClose, initialContent }) {
  const [content, setContent] = useState(initialContent || "");
  const { token } = useToken();
  const baseUrl = "http://localhost:5000";

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      content,
    };

    console.log(initialContent);

    if (initialContent) {
      // Update
      axios
        .put(`${baseUrl}/blog/update`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          onClose(response, content, "Update");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      // Create
      axios
        .post(`${baseUrl}/blog/create`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then((response) => {
          console.log("I am from create blog: " + content);
          onClose(response, content, "Create");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="create-blog-container">
      <h2>{initialContent ? "Edit Blog" : "Create a Blog"}</h2>
      <form className="create-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Blog Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            required
            rows="5"
          ></textarea>
        </div>
        <div className="button-group">
          <button type="submit">{initialContent ? "Update" : "Submit"}</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBlog;
