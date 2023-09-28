import React from "react";
import "./blog.css";

function Blog({ id, content, onDelete, onUpdate }) {
  return (
    <div className="blog-post">
      <p className="blog-content">{content}</p>
      <div className="button-group">
        {onDelete && (
          <button className="delete-button" onClick={() => onDelete()}>
            Delete
          </button>
        )}
        {onUpdate && (
          <button
            className="update-button"
            onClick={() => onUpdate(id, content)}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default Blog;
