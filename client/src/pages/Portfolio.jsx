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
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search category or client..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white text-slate-750 focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
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
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" />
          Add Project
        </button>
      </div>

      {/* Main Table */}
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
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Tech Stack</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Visibility</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 text-[#0a0a0a] animate-spin" />
                        <span className="ml-3 text-xs text-slate-550 font-bold">Fetching portfolio files...</span>
                      </div>
                    </td>
                  </tr>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <tr key={project.id} className="table-row">
                      <td className="px-6 py-3.5 text-left">
                        <div className="text-xs font-bold text-slate-800">{project.name}</div>
                        {project.description && (
                          <div className="text-[10px] text-slate-450 line-clamp-1 mt-0.5">{project.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 text-left">{project.category}</td>
                      <td className="px-6 py-3.5 text-left">
                        <div className="flex flex-wrap gap-1 max-w-[250px]">
                          {project.tech_stack.split(',').map((tech) => (
                            <span key={tech} className="px-2 py-0.5 bg-slate-50 text-slate-600 rounded text-[9px] font-bold border border-slate-100">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-655 font-bold text-left">{project.client}</td>
                      <td className="px-6 py-3.5 text-left">
                        {project.visible ? (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] bg-[#0a0a0a] text-white">
                            <Eye className="w-3 h-3 mr-1" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] bg-transparent text-slate-450 border border-dashed border-slate-300">
                            <EyeOff className="w-3 h-3 mr-1" /> Draft
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97] transition-all"
                          title="Edit project details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(project)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-black active:scale-[0.97] transition-all"
                          title="Remove project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-450">
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
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
          {formError && (
            <div className="p-3 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-xs text-black flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Web Development"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Client *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                  value={formData.client}
                  onChange={e => setFormData({ ...formData, client: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tech Stack * (comma separated)</label>
              <input
                type="text"
                required
                placeholder="React, Tailwind CSS, Supabase"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.tech_stack}
                onChange={e => setFormData({ ...formData, tech_stack: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#0a0a0a] focus:ring-1 focus:ring-[#0a0a0a] text-slate-800"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="visible-toggle"
                className="w-4 h-4 text-[#0a0a0a] border-slate-350 rounded focus:ring-[#0a0a0a] cursor-pointer accent-black"
                checked={formData.visible}
                onChange={e => setFormData({ ...formData, visible: e.target.checked })}
              />
              <label htmlFor="visible-toggle" className="text-xs font-bold text-slate-700 select-none cursor-pointer uppercase tracking-wider">
                Publish Live on Site (Visibility Toggle)
              </label>
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
        <div className="space-y-4 text-left">
          <p className="text-xs text-slate-550 leading-relaxed">
            Are you sure you want to remove project <strong className="text-slate-850">{selectedProject?.name}</strong>? All association data will be lost.
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
              {submitting ? 'Deleting...' : 'Delete Project'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
