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
  const [categoryFilter, setCategoryFilter] = useState(
    localStorage.getItem("categoryFilter") || ""
  );

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <label className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by category:
            </span>
            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
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

        {/* Create New Post Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Create New Post
          </h2>
          <form onSubmit={handleNewPostSubmit} className="space-y-4">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={newPost.category}
                onChange={handleNewPostChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
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
                value={newPost.title}
                onChange={handleNewPostChange}
                required
                placeholder="Enter your post title"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleNewPostChange}
                required
                rows="6"
                placeholder="Write your post content here..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-white transition-colors"
            >
              Publish Post
            </button>
          </form>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
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
      </div>
    </div>
  );
};

export default LandingPage;
