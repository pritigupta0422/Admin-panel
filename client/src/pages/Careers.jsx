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
  Users
} from 'lucide-react';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    position: '',
    department: '',
    type: 'full_time',
    description: '',
    applicants: 0,
    status: 'draft'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/careers?q=${searchTerm}`);
      setJobs(res.data);
    } catch (err) {
      console.error('Fetch careers error:', err);
      setError('Failed to fetch job listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchJobs();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setSelectedJob(null);
    setFormData({
      position: '',
      department: '',
      type: 'full_time',
      description: '',
      applicants: 0,
      status: 'draft'
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setFormData({
      position: job.position,
      department: job.department,
      type: job.type,
      description: job.description || '',
      applicants: job.applicants || 0,
      status: job.status
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Delete
  const handleOpenDelete = (job) => {
    setSelectedJob(job);
    setIsDeleteModalOpen(true);
  };

  // Submit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.position.trim() || !formData.department.trim() || !formData.type) {
      setFormError('Position, department, and type are required.');
      return;
    }

    setSubmitting(true);
    try {
      if (selectedJob) {
        // Update
        const res = await api.put(`/careers/${selectedJob.id}`, formData);
        setJobs(jobs.map(j => j.id === selectedJob.id ? res.data : j));
      } else {
        // Create
        const res = await api.post('/careers', formData);
        setJobs([res.data, ...jobs]);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error('Save job error:', err);
      setFormError(err.response?.data?.error || 'Failed to save job posting.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete job
  const handleDeleteSubmit = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/careers/${selectedJob.id}`);
      setJobs(jobs.filter(j => j.id !== selectedJob.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Delete career error:', err);
      alert('Failed to delete job listing.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadges = {
    open: 'bg-status-green-bg text-status-green-text',
    review: 'bg-status-orange-bg text-status-orange-text',
    draft: 'bg-status-blue-bg text-status-blue-text',
    closed: 'bg-status-grey-bg text-status-grey-text'
  };

  const formatJobType = (type) => {
    switch(type) {
      case 'full_time': return 'Full-time';
      case 'contract': return 'Contract';
      case 'internship': return 'Internship';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action panel */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </div>
          <input
            type="text"
            placeholder="Search positions or departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Add Job Button */}
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer shadow-premium"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Job
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
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Applicants</th>
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
                        <span className="ml-3 text-sm text-gray-550 font-medium">Fetching job lists...</span>
                      </div>
                    </td>
                  </tr>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job.id} className="table-row">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-800">{job.position}</div>
                        {job.description && (
                          <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{job.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-650 font-medium">{formatJobType(job.type)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-sm text-gray-700">
                          <Users className="w-4 h-4 text-gray-450 mr-1.5" />
                          <span>{job.applicants || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${statusBadges[job.status]}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(job)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-brand hover:bg-gray-100 transition-colors"
                          title="Edit job opening details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(job)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                          title="Remove job opening"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No jobs listed matching criteria.
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
        title={selectedJob ? 'Edit Job Opening' : 'Add New Job Opening'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-655 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {formError}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Position Title *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Department *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Job Type *</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                  value={formData.type}
                  onChange={e => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="full_time">Full-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="draft">Draft</option>
                  <option value="open">Open</option>
                  <option value="review">Review</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Applicants Count</label>
                <input
                  type="number"
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.applicants}
                  onChange={e => setFormData({ ...formData, applicants: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Description</label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
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
              {submitting ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Job Opening Removal"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete the job listing for <strong className="text-gray-800">{selectedJob?.position}</strong>?
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
              {submitting ? 'Deleting...' : 'Delete Job'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
