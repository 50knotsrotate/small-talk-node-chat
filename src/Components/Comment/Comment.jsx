import React from "react";
import "./Comment.css";
import "../ChatWindow/ChatWindow.css";

const Comment = props => {
  const { user, text, originalText, username, editing, index } = props;

  return (
    <div className="comment-container">
      <div>
        <h2>{props.username}</h2>
        {user === username && editing ? (
          <input
            className="edit-input"
            placeholder="Be more careful next time..."
            onChange={e => props.editingComment(e.target.value, index)}
          />
        ) : (
          <h4>{originalText}</h4>
        )}
      </div>
      <div className="buttons">
        {user === username ? (
          !editing ? (
            <div className="edit-delete-buttons">
              <button
                className="delete-button"
                onClick={() => props.delete(index)}
              >
                Delete
              </button>
              <button
                className="edit-button"
                onClick={() => props.toggleEdit(index)}
              >
                Edit
              </button>
            </div>
          ) : (
            <button
              className="submit-button"
              onClick={() => props.submit(index)}
            >
              Submit
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Comment;