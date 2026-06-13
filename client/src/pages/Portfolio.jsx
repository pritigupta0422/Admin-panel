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
  Eye,
  EyeOff
} from 'lucide-react';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    tech_stack: '',
    client: '',
    description: '',
    visible: true
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Unique categories list for dropdown filter
  const [categories, setCategories] = useState([]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/portfolio?q=${searchTerm}&category=${categoryFilter}`);
      setProjects(res.data);
      
      // Compute unique categories from results if categories is empty (first load)
      if (categories.length === 0 && res.data.length > 0) {
        const uniqueCats = [...new Set(res.data.map(p => p.category))].filter(Boolean);
        setCategories(uniqueCats);
      }
    } catch (err) {
      console.error('Fetch portfolio error:', err);
      setError('Failed to fetch portfolio listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setSelectedProject(null);
    setFormData({
      name: '',
      category: '',
      tech_stack: '',
      client: '',
      description: '',
      visible: true
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (project) => {
    setSelectedProject(project);
    setFormData({
      name: project.name,
      category: project.category,
      tech_stack: project.tech_stack,
      client: project.client,
      description: project.description || '',
      visible: project.visible
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Delete
  const handleOpenDelete = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  // Submit Add or Edit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.category.trim() || !formData.tech_stack.trim() || !formData.client.trim()) {
      setFormError('Name, category, tech stack, and client are required fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (selectedProject) {
        // Update
        const res = await api.put(`/portfolio/${selectedProject.id}`, formData);
        setProjects(projects.map(p => p.id === selectedProject.id ? res.data : p));
      } else {
        // Create
        const res = await api.post('/portfolio', formData);
        setProjects([res.data, ...projects]);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error('Submit project error:', err);
      setFormError(err.response?.data?.error || 'Failed to save portfolio project.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete operation
  const handleDeleteSubmit = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/portfolio/${selectedProject.id}`);
      setProjects(projects.filter(p => p.id !== selectedProject.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Delete project error:', err);
      alert('Failed to delete project.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Filters and Actions Bar */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4.5 h-4.5" />
            </div>
            <input
              type="text"
              placeholder="Search category or client..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Add Project Button */}
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer shadow-premium"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Project
        </button>
      </div>

      {/* Main Table */}
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
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Tech Stack</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Visibility</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 text-brand animate-spin" />
                        <span className="ml-3 text-sm text-gray-550 font-medium">Fetching portfolio files...</span>
                      </div>
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className="table-row">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-800">{project.name}</div>
                        {project.description && (
                          <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{project.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{project.category}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {project.tech_stack.split(',').map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-medium">{project.client}</td>
                      <td className="px-6 py-4">
                        {project.visible ? (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-status-green-bg text-status-green-text">
                            <Eye className="w-3 h-3 mr-1" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full bg-status-orange-bg text-status-orange-text">
                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-brand hover:bg-gray-100 transition-colors"
                          title="Edit project details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(project)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                          title="Remove project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No portfolio items found.
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
        title={selectedProject ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Project Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Development"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Client *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Tech Stack * (comma separated)</label>
              <input
                type="text"
                required
                placeholder="React, Tailwind CSS, Supabase"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.tech_stack}
                onChange={e => setFormData({ ...formData, tech_stack: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Description</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="visible-toggle"
                className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
                checked={formData.visible}
                onChange={e => setFormData({ ...formData, visible: e.target.checked })}
              />
              <label htmlFor="visible-toggle" className="text-sm font-semibold text-gray-700 select-none cursor-pointer">
                Publish Live on Site (Visibility Toggle)
              </label>
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
              {submitting ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Project Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to remove project <strong className="text-gray-800">{selectedProject?.name}</strong>? All association data will be lost.
          </p>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-red-650 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Project'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
