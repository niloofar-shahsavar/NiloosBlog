import { useEffect, useState, useContext } from "react";
import Post from "../Components/Post";
import { UserContext } from "../Components/UserContext";

const LandingPage = () => {
  const { userName } = useContext(UserContext);
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || [
      {
        title: "Exploring the Wonders of Nature",
        content:
          "Nature has an incredible way of inspiring awe and wonder in those who take the time to explore its beauty. From towering mountains to serene lakes, there's always something new to discover.",
        author: "Emily Brown",
      },
      {
        title: "The Joy of Reading",
        content:
          "There's nothing quite like getting lost in a good book. Whether it's fiction or non-fiction, reading allows us to escape into different worlds and gain new perspectives.",
        author: "Jane Smith",
      },
      {
        title: "Tips for Staying Productive",
        content:
          "Staying productive can be a challenge, but with a few simple tips, it's possible to get more done. Setting clear goals, taking regular breaks, and staying organized are key.",
        author: "Alex Johnson",
      },
    ]
  );
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    author: userName,
  });
  const [postToEdit, setPostToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const handlePostDelete = (indexToDelete) => {
    setPosts(posts.filter((_, index) => index !== indexToDelete));
  };

  const handleNewPostChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    setPosts([...posts, { ...newPost, author: userName }]);
    setNewPost({ title: "", content: "" });
  };

  const handleEditInitiate = (index) => {
    setPostToEdit({ ...posts[index], index });
  };

  const handleEditChange = (e) => {
    setPostToEdit({ ...postToEdit, [e.target.name]: e.target.value });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    const updatedPosts = posts.map((post, index) =>
      index === postToEdit.index ? postToEdit : post
    );
    setPosts(updatedPosts);
    setPostToEdit(null);
  };

  return (
    <div className="blog-page">
      <div className="addPost-div">
        <p className="title-add-post">Write your new post here</p>
        <form onSubmit={handleNewPostSubmit}>
          <input
            className="post-title-input"
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            placeholder="Post title"
          />
          <textarea
            className="content-input"
            name="content"
            value={newPost.content}
            onChange={handleNewPostChange}
            placeholder="Post content"
          />
          <button className="add-post-button" type="submit">
            Add Post
          </button>
        </form>
      </div>
      {posts.map((post, index) => (
        <Post
          key={index}
          index={index}
          title={post.title}
          content={post.content}
          author={post.author}
          onDelete={() => handlePostDelete(index)}
          onEditInitiate={() => handleEditInitiate(index)}
          isAuthor={post.author === userName}
          isEditing={postToEdit && postToEdit.index === index}
          postToEdit={postToEdit}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />
      ))}
    </div>
  );
};

export default LandingPage;
