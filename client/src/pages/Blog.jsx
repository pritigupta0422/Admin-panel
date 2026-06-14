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
    published: 'bg-[#0a0a0a] text-white border border-transparent rounded-full',
    draft: 'bg-slate-50 text-slate-450 border border-slate-200 rounded-full',
    pending: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full'
  };

  return (
    <div className="space-y-6">
      
      {/* Filters and Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Box */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search title, author, or category..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
            />
          </div>

          {/* Status Select Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-750 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
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
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" />
          Add Post
        </button>
      </div>

      {/* Posts Table */}
      {error ? (
        <div className="p-4 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-zinc-500 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Published Date</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 text-[#0a0a0a] animate-spin" />
                        <span className="ml-3 text-xs text-slate-555 font-bold">Fetching blog logs...</span>
                      </div>
                    </td>
                  </tr>
                ) : posts.length > 0 ? (
                  posts.map((post) => (
                    <tr key={post.id} className="table-row">
                      <td className="px-6 py-3.5 text-left">
                        <div className="text-xs font-bold text-slate-800 line-clamp-1">{post.title}</div>
                        {post.content && (
                          <div className="text-[10px] text-slate-450 line-clamp-1 mt-0.5">{post.content}</div>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-655 font-semibold text-left">{post.author}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 text-left">{post.category}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-400 text-left">
                        {post.published_at ? (
                          new Date(post.published_at).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                        ) : (
                          <span className="text-slate-300 font-bold">—</span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-left">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${statusBadges[post.status]}`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(post)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97] transition-all"
                          title="Edit blog post details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(post)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-black active:scale-[0.97] transition-all"
                          title="Remove post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-450">
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
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
          {formError && (
            <div className="p-3 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-xs text-black flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Author *</label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                  value={formData.author}
                  onChange={e => setFormData({ ...formData, author: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Technology"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800 bg-white"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Content (Markdown / Text)</label>
              <textarea
                rows="5"
                placeholder="Enter article body..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-50 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
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
        <div className="space-y-4 text-left">
          <p className="text-xs text-slate-550 leading-relaxed">
            Are you sure you want to delete blog article <strong className="text-slate-850">{selectedPost?.title}</strong>? This is permanent.
          </p>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-slate-200 text-slate-500 bg-white rounded-lg hover:bg-slate-50 text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-red-650 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Post'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
