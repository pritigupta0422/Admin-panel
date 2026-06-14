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
    open: 'bg-[#0a0a0a] text-white border border-transparent rounded-full',
    review: 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7] rounded-full',
    draft: 'bg-sky-50 text-sky-700 border border-sky-200/50 rounded-full',
    closed: 'bg-slate-55 text-slate-400 border border-slate-200 rounded-full'
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
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search positions or departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
          />
        </div>

        {/* Add Job Button */}
        <button
          onClick={handleOpenCreate}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" />
          Add Job
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
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Applicants</th>
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
                        <span className="ml-3 text-xs text-slate-555 font-bold">Fetching job listings...</span>
                      </div>
                    </td>
                  </tr>
                ) : jobs.length > 0 ? (
                  jobs.map((job) => (
                    <tr key={job.id} className="table-row">
                      <td className="px-6 py-3.5 text-left">
                        <div className="text-xs font-bold text-slate-800">{job.position}</div>
                        {job.description && (
                          <div className="text-[11px] text-slate-455 line-clamp-1 mt-0.5">{job.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 text-left">{job.department}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-655 font-semibold text-left">{formatJobType(job.type)}</td>
                      <td className="px-6 py-3.5 text-left">
                        <div className="flex items-center text-xs text-slate-700">
                          <Users className="w-3.5 h-3.5 text-slate-400 mr-1.5 stroke-[2]" />
                          <span className="font-medium text-slate-600">{job.applicants || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-left">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${statusBadges[job.status]}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(job)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97] transition-all"
                          title="Edit job opening details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(job)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-black transition-colors duration-150 active:scale-[0.97] transition-all"
                          title="Remove job opening"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-450">
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
            <div className="p-3 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-xs text-black flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {formError}
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Position Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Department *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Engineering"
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Job Type *</label>
                <select
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
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
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Status</label>
                <select
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
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
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Applicants Count</label>
                <input
                  type="number"
                  min="0"
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                  value={formData.applicants}
                  onChange={e => setFormData({ ...formData, applicants: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Description</label>
              <textarea
                rows="4"
                placeholder="Write job requirements, responsibilities, and benefits..."
                className="w-full p-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-lg text-slate-500 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer"
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
          <p className="text-xs text-slate-500 leading-relaxed">
            Are you sure you want to delete the job listing for <strong className="text-slate-800">{selectedJob?.position}</strong>?
          </p>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold uppercase tracking-wider rounded-lg text-slate-500 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteSubmit}
              disabled={submitting}
              className="px-4 py-2 bg-red-650 hover:bg-red-700 active:scale-[0.97] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm cursor-pointer"
            >
              {submitting ? 'Deleting...' : 'Delete Job'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
