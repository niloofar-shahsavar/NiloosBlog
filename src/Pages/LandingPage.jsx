import { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "../Components/Post";
import { UserContext } from "../Components/UserContext";

const LandingPage = () => {
  const { userName } = useContext(UserContext);

  const initialPosts = JSON.parse(localStorage.getItem("posts")) || [
    {
      id: uuidv4(),
      title: "Exploring the Wonders of Nature",
      content:
        "Nature has an incredible way of inspiring awe and wonder in those who take the time to explore its beauty. From towering mountains to serene lakes, there's always something new to discover.",
      author: "Emily Brown",
      category: "Nature",
    },
    {
      id: uuidv4(),
      title: "The Joy of Reading",
      content:
        "There's nothing quite like getting lost in a good book. Whether it's fiction or non-fiction, reading allows us to escape into different worlds and gain new perspectives.",
      author: "Jane Smith",
      category: "Books",
    },
    {
      id: uuidv4(),
      title: "Tips for Staying Productive",
      content:
        "Staying productive can be a challenge, but with a few simple tips, it's possible to get more done. Setting clear goals, taking regular breaks, and staying organized are key.",
      author: "Alex Johnson",
      category: "Productivity",
    },
  ];

  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState({
    id: uuidv4(),
    title: "",
    content: "",
    author: userName,
    category: "",
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
    setPosts([...posts, { ...newPost, id: uuidv4(), author: userName }]);
    setNewPost({
      id: uuidv4(),
      title: "",
      content: "",
      author: userName,
      category: "",
    });
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
      <div className="addpost-div">
        <p className="title-add-post">Write your new post here</p>
        <form onSubmit={handleNewPostSubmit}>
          Choose a category:
          <input
            className="post-category-input"
            type="text"
            name="category"
            value={newPost.category}
            onChange={handleNewPostChange}
            placeholder="Category"
          />
          Choose a title:
          <input
            className="post-title-input"
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleNewPostChange}
            placeholder="Post title"
          />
          Write your post:
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
          key={post.id}
          id={post.id}
          index={index}
          title={post.title}
          content={post.content}
          author={post.author}
          category={post.category}
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
