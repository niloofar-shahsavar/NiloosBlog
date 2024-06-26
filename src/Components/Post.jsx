import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Components/UserContext";

const Post = ({
  id,
  title,
  content,
  author,
  category,
  onDelete,
  onEditInitiate,
  isAuthor,
  isEditing,
  postToEdit,
  handleEditChange,
  handleEditSave,
  categories,
}) => {
  const commentsKey = `post-${id}-comments`;
  const lsComments = localStorage.getItem(commentsKey);
  const [comments, setComments] = useState(
    lsComments ? JSON.parse(lsComments) : []
  );
  const [newComment, setNewComment] = useState("");

  const { userName } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }, [comments, commentsKey]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const extendedComments = [
      ...comments,
      { text: newComment, author: userName },
    ];
    setComments(extendedComments);
    setNewComment("");
  };

  const handleCommentDelete = (indexToDelete) => {
    if (comments[indexToDelete].author !== userName) {
      alert("You can only delete your own comments.");
      return;
    }
    const filteredComments = comments.filter(
      (_, index) => index !== indexToDelete
    );
    setComments(filteredComments);
  };

  return (
    <div className="post-header">
      {isEditing ? (
        <form onSubmit={handleEditSave}>
          Category
          <select
            className="category-edit-input"
            name="category"
            value={postToEdit.category}
            onChange={handleEditChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Finance">Finance</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
          </select>
          Title
          <input
            className="title-edit-input"
            type="text"
            name="title"
            value={postToEdit.title}
            onChange={handleEditChange}
            placeholder="Title"
          />
          Content
          <textarea
            className="content-edit-input"
            name="content"
            value={postToEdit.content}
            onChange={handleEditChange}
            placeholder="Content"
          />
          <button className="edit-save-button" type="submit">
            Save
          </button>
        </form>
      ) : (
        <>
          <div>
            <p className="post-category">Category: {category}</p>
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
          <div>
            <form onSubmit={handleCommentSubmit}>
              <input
                className="add-comment-input"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment"
              />
              <button className="add-comment-button" type="submit">
                Submit Your Comment
              </button>
            </form>
          </div>
          <div>
            {comments.map((comment, index) => (
              <div key={index}>
                <p className="comment-input-field">{comment.text}</p>
                <p>Author: {comment.author}</p>
                {comment.author === userName && (
                  <button
                    className="delete-comment-button"
                    onClick={() => handleCommentDelete(index)}
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
