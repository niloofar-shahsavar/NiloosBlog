import React, { useState, useContext } from "react";
import { UserContext } from "../Components/UserContext";

const Post = ({
  title,
  content,
  author,
  onDelete,
  onEditInitiate,
  isAuthor,
  isEditing,
  postToEdit,
  handleEditChange,
  handleEditSave,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { userName } = useContext(UserContext);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const handleCommentDelete = (indexToDelete) => {
    setComments(comments.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="post-header">
      {isEditing ? (
        <form onSubmit={handleEditSave}>
          <input
            className="title-edit-input"
            type="text"
            name="title"
            value={postToEdit.title}
            onChange={handleEditChange}
          />
          <textarea
            className="content-edit-input"
            name="content"
            value={postToEdit.content}
            onChange={handleEditChange}
          />
          <button className="edit-save-button" type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          <div>
            <h2 className="post-title">{title}</h2>
            <p className="post-author">Author: {author}</p>
          </div>
          <div>
            <p className="post-content">{content}</p>
          </div>
          {isAuthor && (
            <>
              <button onClick={onDelete} className="delete-post-button">
                Delete Post
              </button>
              <button onClick={onEditInitiate} className="edit-post-button">
                Edit
              </button>
            </>
          )}
          <div className="comment-input-form-div">
            <form onSubmit={handleCommentSubmit}>
              <input
                className="comment-input"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment"
              />
              <button className="comment-button" type="submit">
                Submit Your Comment
              </button>
            </form>
          </div>
          <div className="comments">
            {comments.map((comment, index) => (
              <div key={index}>
                <p className="comment-input-field">{comment}</p>Author:{" "}
                {userName}
                <button
                  className="delete-comment-button"
                  onClick={() => handleCommentDelete(index)}
                >
                  Delete Comment
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
