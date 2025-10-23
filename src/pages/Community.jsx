import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaPlus, FaFilter, FaSpinner, FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { getPosts } from "../services/api";
import { useAuth } from "../provider/AuthProvider";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";

const CATEGORIES = [
  "all",
  "General",
  "Tree Plantation",
  "Blood Donation",
  "Food Distribution",
  "Education",
  "Health Camp",
  "Community Cleanup",
  "Animal Welfare",
  "Disaster Relief",
  "Other",
];

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    filterAndSortPosts();
  }, [posts, selectedCategory, sortBy, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to load posts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortPosts = () => {
    let filtered = [...posts];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((post) =>
        post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts
    if (sortBy === "trending") {
      filtered.sort((a, b) => {
        const scoreA = (a.likes?.length || 0) + (a.comments?.length || 0);
        const scoreB = (b.likes?.length || 0) + (b.comments?.length || 0);
        return scoreB - scoreA;
      });
    } else {
      // Sort by most recent
      filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredPosts(filtered);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    toast.success("Your post has been shared!");
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts(
      posts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  };

  const handlePostDelete = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId));
  };

  return (
    <>
      <Helmet>
        <title>SocialNest Feed - Community Updates</title>
        <meta
          name="description"
          content="Join the SocialNest community and share your volunteer experiences"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  SocialNest Feed
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Stay updated with community activities and volunteer stories
                </p>
              </div>
              {user && (
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                >
                  <FaPlus className="w-4 h-4" />
                  <span>Create Post</span>
                </button>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search posts, people, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center space-x-2">
                  <FaFilter className="text-gray-500 dark:text-gray-400" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="recent">Most Recent</option>
                  <option value="trending">Trending</option>
                </select>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
              </div>
            </div>
          </div>

          {/* Create Post Prompt for Non-logged Users */}
          {!user && (
            <div className="mb-6 p-6 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl text-center">
              <p className="text-gray-700 dark:text-gray-300">
                <a
                  href="/auth/login"
                  className="font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  Login
                </a>{" "}
                to share your volunteer stories and connect with the community!
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <FaSpinner className="animate-spin text-4xl text-teal-600" />
            </div>
          ) : (
            <>
              {/* Posts Feed - Single Column Layout */}
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onUpdate={handlePostUpdate}
                      onDelete={handlePostDelete}
                    />
                  ))
                ) : (
                  <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      No posts found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {searchQuery || selectedCategory !== "all"
                        ? "Try adjusting your search or filters"
                        : "Be the first to share something with the community!"}
                    </p>
                    {user && !searchQuery && selectedCategory === "all" && (
                      <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-semibold"
                      >
                        Create First Post
                      </button>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};

export default Community;