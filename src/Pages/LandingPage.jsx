import { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import Post from "../Components/Post";
import { UserContext } from "../Components/UserContext";

const LandingPage = () => {
  const { userName } = useContext(UserContext);

  const categories = [
    "Technology",
    "Health",
    "Education",
    "Finance",
    "Entertainment",
    "Sports",
    "Nature",
    "Books",
    "Productivity",
  ];

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
      title: "The Future of AI Technology",
      content:
        "Artificial Intelligence is rapidly advancing, with new applications being developed in various fields. From healthcare to finance, AI has the potential to revolutionize the way we live and work.",
      author: "David Green",
      category: "Technology",
    },
    {
      id: uuidv4(),
      title: "Maintaining a Healthy Lifestyle",
      content:
        "Maintaining a healthy lifestyle involves regular exercise, balanced diet, and sufficient sleep. Incorporating these habits into your daily routine can significantly improve your overall well-being.",
      author: "Sarah Lee",
      category: "Health",
    },
    {
      id: uuidv4(),
      title: "Innovative Approaches in Education",
      content:
        "Education is evolving with the integration of technology and innovative teaching methods. These changes are making learning more engaging and accessible for students around the world.",
      author: "Mark Wilson",
      category: "Education",
    },
    {
      id: uuidv4(),
      title: "Highlights from the World of Sports",
      content:
        "The sports world has seen some incredible moments this year. From record-breaking performances to unforgettable matches, sports fans have had plenty to cheer about.",
      author: "Chris Thompson",
      category: "Sports",
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
  const [categoryFilter, setCategoryFilter] = useState(localStorage.getItem("categoryFilter") || "");

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("categoryFilter", categoryFilter);
  }, [categoryFilter]);

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

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredPosts = categoryFilter
    ? posts.filter((post) => post.category === categoryFilter)
    : posts;

  return (
    <div className="blog-page">
      <div className="filter-div">
        <label className="label-filter">
          Filter by category:
          <select
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="addpost-div">
        <p className="title-add-post">Write your new post here</p>
        <form onSubmit={handleNewPostSubmit}>
          <label>
            Choose a category:
            <select
              className="post-category-input"
              name="category"
              value={newPost.category}
              onChange={handleNewPostChange}
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
          </label>
          <label>
            Choose a title:
            <input
              className="post-title-input"
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleNewPostChange}
              placeholder="Post title"
            />
          </label>
          <label>
            Write your post:
            <textarea
              className="content-input"
              name="content"
              value={newPost.content}
              onChange={handleNewPostChange}
              placeholder="Post content"
            />
          </label>
          <button className="add-post-button" type="submit">
            Add Post
          </button>
        </form>
      </div>
      {filteredPosts.map((post, index) => (
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
          categories={categories}
        />
      ))}
    </div>
  );
};

export default LandingPage;
