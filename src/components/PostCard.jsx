import React, { useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaComment,
  FaTrash,
  FaUser,
  FaEllipsisH,
  FaPaperPlane
} from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import { toggleLikePost, addComment, deleteFeedPost } from "../services/api";
import { useAuth } from "../provider/AuthProvider";

const PostCard = ({ post, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const isLiked = user && post.likes?.includes(user.email);
  const isOwner = user && post.userId === user.email;

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like posts");
      return;
    }
    try {
      const updatedPost = await toggleLikePost(post._id);
      onUpdate(updatedPost);
    } catch (error) {
      toast.error("Failed to update like");
      console.error(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    setIsSubmitting(true);
    try {
      const updatedPost = await addComment(post._id, commentText);
      onUpdate(updatedPost);
      setCommentText("");
      if (!showComments) setShowComments(true);
    } catch (error) {
      toast.error("Failed to add comment");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteFeedPost(post._id);
        onDelete(post._id);
        toast.success("Post deleted successfully");
      } catch (error) {
        toast.error("Failed to delete post");
        console.error(error);
      }
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            {post.userAvatar ? (
              <img
                src={post.userAvatar}
                alt={post.username}
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-100 dark:border-teal-900"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center border-2 border-teal-200 dark:border-teal-800">
                <FaUser className="text-teal-600 dark:text-teal-400 w-6 h-6" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {post.username}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{getTimeAgo(post.createdAt)}</span>
              {post.category && post.category !== "General" && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                    {post.category}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Options Menu */}
        <div className="relative">
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
          >
            <FaEllipsisH className="w-4 h-4" />
          </button>
          {showOptions && (
            <div className="absolute right-0 top-10 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-1 z-10">
              {isOwner && (
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center space-x-2"
                >
                  <FaTrash className="w-4 h-4" />
                  <span>Delete Post</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>
      {/* Image */}
      {post.imageUrl && (
        <div className="w-full px-4 pb-3">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full rounded-lg object-cover max-h-96"
            loading="lazy"
          />
        </div>
      )}
      {/* Stats */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-4">
          {post.likes?.length > 0 && (
            <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
          )}
          {post.comments?.length > 0 && (
            <span>{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</span>
          )}
        </div>
      </div>
      {/* Actions */}
      <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700 flex items-center justify-start gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition flex-1 justify-center ${
            isLiked
              ? "text-red-600 bg-red-50 dark:bg-red-900/20"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          }`}
        >
          {isLiked ? (
            <FaHeart className="w-5 h-5" />
          ) : (
            <FaRegHeart className="w-5 h-5" />
          )}
          <span className="font-medium">Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition flex-1 justify-center"
        >
          <FaComment className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>
      </div>
      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 dark:border-gray-700">
          {/* Comment Form */}
          {user && (
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <form onSubmit={handleComment} className="flex space-x-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-teal-600 dark:text-teal-400 w-4 h-4" />
                  </div>
                )}
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !commentText.trim()}
                    className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-1"
                  >
                    <FaPaperPlane className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Comments List */}
          <div className="max-h-80 overflow-y-auto">
            {post.comments?.length > 0 ? (
              <div className="p-4 space-y-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    {comment.userAvatar ? (
                      <img
                        src={comment.userAvatar}
                        alt={comment.username}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-teal-600 dark:text-teal-400 w-4 h-4" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl px-4 py-2">
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">
                          {comment.username}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                          {comment.text}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 mt-1 px-1">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {getTimeAgo(comment.timestamp)}
                        </span>
                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                          Like
                        </button>
                        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="text-4xl mb-2">💬</div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No comments yet. Be the first to comment!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;