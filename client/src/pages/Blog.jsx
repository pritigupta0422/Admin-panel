import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2, 
  AlertCircle,
  FileText
} from 'lucide-react';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    content: '',
    status: 'draft'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blog?q=${searchTerm}&status=${statusFilter}`);
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch blogs error:', err);
      setError('Failed to fetch blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPosts();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setSelectedPost(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      content: '',
      status: 'draft'
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      author: post.author,
      category: post.category,
      content: post.content || '',
      status: post.status
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Delete
  const handleOpenDelete = (post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  };

  // Submit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.title.trim() || !formData.author.trim() || !formData.category.trim()) {
      setFormError('Title, author, and category are required.');
      return;
    }

    setSubmitting(true);
    try {
      if (selectedPost) {
        // Update
        const res = await api.put(`/blog/${selectedPost.id}`, formData);
        setPosts(posts.map(p => p.id === selectedPost.id ? res.data : p));
      } else {
        // Create
        const res = await api.post('/blog', formData);
        setPosts([res.data, ...posts]);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error('Save blog error:', err);
      setFormError(err.response?.data?.error || 'Failed to save blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Form
  const handleDeleteSubmit = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/blog/${selectedPost.id}`);
      setPosts(posts.filter(p => p.id !== selectedPost.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Delete post error:', err);
      alert('Failed to delete blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadges = {
    published: 'bg-status-green-bg text-status-green-text',
    draft: 'bg-status-orange-bg text-status-orange-text',
    pending: 'bg-status-blue-bg text-status-blue-text'
  };

  return (
    <div className="space-y-6">
      
      {/* Filters and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="Search title, author, or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
            />
          </div>

          {/* Status Select Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Add Blog Post Trigger */}
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer shadow-premium"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Post
        </button>
      </div>

      {/* Posts Table */}
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-750 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-gray-150 text-left bg-gray-55/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 text-brand animate-spin" />
                        <span className="ml-3 text-sm text-gray-550 font-medium">Fetching blog logs...</span>
                      </div>
                    </td>
                  </tr>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.id} className="table-row">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-800 line-clamp-1">{post.title}</div>
                        {post.content && (
                          <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{post.content}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {post.published_at ? (
                          new Date(post.published_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        ) : (
                          <span className="text-gray-300 font-medium">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${statusBadges[post.status]}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-brand hover:bg-gray-100 transition-colors"
                          title="Edit blog post details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(post)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                          title="Remove post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No blog posts found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE & EDIT FORM MODAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedPost ? 'Edit Blog Article' : 'Write New Blog Article'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-650 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {formError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Author *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Technology"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Content (Markdown / Text)</label>
              <textarea
                rows="5"
                placeholder="Enter article body..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-650 hover:bg-gray-150 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-md hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Post Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete blog article <strong className="text-gray-800">{selectedPost?.title}</strong>? This is permanent.
          </p>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-650 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-red-650 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Post'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
