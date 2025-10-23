import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaTimes, FaImage, FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { createPost } from "../services/api";

const CATEGORIES = [
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

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    setIsSubmitting(true);
    try {
      const postData = {
        content: content.trim(),
        imageUrl: imageUrl.trim() || null,
        category: category,
      };

      const newPost = await createPost(postData);
      toast.success("Post created successfully!");
      onPostCreated(newPost);
      handleClose();
    } catch (error) {
      toast.error(error.message || "Failed to create post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setContent("");
      setImageUrl("");
      setCategory("General");
      onClose();
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-secondary-800 p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold text-secondary-900 dark:text-secondary-50"
                  >
                    Create New Post
                  </Dialog.Title>
                  <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="p-2 text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-full transition disabled:opacity-50"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Category Selector */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled={isSubmitting}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      What's on your mind?
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Share your thoughts, experiences, or upcoming volunteer activities..."
                      rows={6}
                      className="w-full px-4 py-3 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                      disabled={isSubmitting}
                      required
                    />
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
                      {content.length} / 1000 characters
                    </p>
                  </div>

                  {/* Image URL Input */}
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                      <FaImage className="inline mr-2" />
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-secondary-100 placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                      disabled={isSubmitting}
                    />
                    <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1">
                      Paste a link to an image you want to share
                    </p>
                  </div>

                  {/* Image Preview */}
                  {imageUrl && (
                    <div className="relative">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full max-h-64 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={handleClose}
                      disabled={isSubmitting}
                      className="px-6 py-2 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-700 transition disabled:opacity-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !content.trim()}
                      className="px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Posting...</span>
                        </>
                      ) : (
                        <span>Post</span>
                      )}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
