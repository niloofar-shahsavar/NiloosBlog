import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Components/UserContext";
import { validateComment } from "../utils/sanitize";

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
  formErrors = [],
}) => {
  const commentsKey = `post-${id}-comments`;
  const lsComments = localStorage.getItem(commentsKey);
  const [comments, setComments] = useState(
    lsComments ? JSON.parse(lsComments) : []
  );
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [commentErrors, setCommentErrors] = useState([]);

  const { userName } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem(commentsKey, JSON.stringify(comments));
  }, [comments, commentsKey]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Validate and sanitize comment
    const validation = validateComment(newComment);

    if (!validation.isValid) {
      setCommentErrors(validation.errors);
      return;
    }

    // Clear errors and add sanitized comment
    setCommentErrors([]);
    const extendedComments = [
      ...comments,
      { text: validation.sanitizedText, author: userName },
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
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
      {isEditing ? (
        /* Edit Mode */
        <form onSubmit={handleEditSave} className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Edit Post
          </h3>

          {/* Error Messages */}
          {formErrors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <ul className="list-disc list-inside space-y-1">
                {formErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-700 dark:text-red-400">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              name="category"
              value={postToEdit.category}
              onChange={handleEditChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={postToEdit.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content
            </label>
            <textarea
              name="content"
              value={postToEdit.content}
              onChange={handleEditChange}
              placeholder="Content"
              rows="8"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </form>
      ) : (
        /* View Mode */
        <>
          {/* Post Header */}
          <div className="p-6 space-y-4">
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full">
              {category}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h2>

            {/* Author */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              By {author}
            </p>

            {/* Content */}
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              {content}
            </p>

            {/* Action Buttons */}
            {isAuthor && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={onEditInitiate}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Edit Post
                </button>
                <button
                  onClick={onDelete}
                  className="px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  Delete Post
                </button>
              </div>
            )}
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            {/* Toggle Comments Button */}
            <button
              onClick={() => setShowComments(!showComments)}
              className="w-full px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-between"
            >
              <span>
                {comments.length}{" "}
                {comments.length === 1 ? "Comment" : "Comments"}
              </span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  showComments ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Comments Content */}
            {showComments && (
              <div className="px-6 pb-6 space-y-4">
                {/* Comment Error Messages */}
                {commentErrors.length > 0 && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <ul className="list-disc list-inside space-y-1">
                      {commentErrors.map((error, index) => (
                        <li key={index} className="text-xs text-red-700 dark:text-red-400">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit} className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => {
                      setCommentErrors([]); // Clear errors when user types
                      setNewComment(e.target.value);
                    }}
                    placeholder="Write a comment..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Post Comment
                  </button>
                </form>

                {/* Comments List */}
                <div className="space-y-4 mt-6">
                  {comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2"
                    >
                      <p className="text-gray-900 dark:text-white">
                        {comment.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          By {comment.author}
                        </p>
                        {comment.author === userName && (
                          <button
                            onClick={() => handleCommentDelete(index)}
                            className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </article>
  );
};

export default Post;
