import Post from "./Post";
import { useState } from "react";

const EditPosts = ({ posts, setPosts }) => {
  const [postToEdit, setPostToEdit] = useState(null);

  const handleEdit = (post) => {
    setPostToEdit(post);
  };

  const handleSave = (editedPost) => {
    setPosts(posts.map((post) => (post === postToEdit ? editedPost : post)));
    setPostToEdit(null);
  };

  return (
    <div>
      {posts.map((post, index) => (
        <Post
          key={index}
          post={post}
          onEdit={handleEdit}
          onSave={handleSave}
          isEditing={post === postToEdit}
        />
      ))}
      {postToEdit ? <Post post={postToEdit} onSave={handleSave} /> : null}
    </div>
  );
};

export default EditPosts;
