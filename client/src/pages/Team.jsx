import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2, 
  AlertCircle
} from 'lucide-react';

export default function Team() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    email: '',
    status: 'active'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/team?q=${searchTerm}`);
      setMembers(res.data);
    } catch (err) {
      console.error('Fetch team error:', err);
      setError('Failed to fetch team directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMembers();
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Open modal for Create
  const handleOpenCreate = () => {
    setSelectedMember(null);
    setFormData({
      name: '',
      role: '',
      department: '',
      email: '',
      status: 'active'
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      department: member.department,
      email: member.email,
      status: member.status
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Delete
  const handleOpenDelete = (member) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  // Submit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.role.trim() || !formData.department.trim() || !formData.email.trim()) {
      setFormError('All fields marked with an asterisk are required.');
      return;
    }

    setSubmitting(true);
    try {
      if (selectedMember) {
        // Update
        const res = await api.put(`/team/${selectedMember.id}`, formData);
        setMembers(members.map(m => m.id === selectedMember.id ? res.data : m));
      } else {
        // Create
        const res = await api.post('/team', formData);
        setMembers([...members, res.data]);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error('Save member error:', err);
      setFormError(err.response?.data?.error || 'Failed to save team member details.');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Form
  const handleDeleteSubmit = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/team/${selectedMember.id}`);
      setMembers(members.filter(m => m.id !== selectedMember.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Delete member error:', err);
      alert('Failed to delete team member.');
    } finally {
      setSubmitting(false);
    }
  };

  const statusBadges = {
    active: 'bg-status-green-bg text-status-green-text',
    inactive: 'bg-status-grey-bg text-status-grey-text'
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </div>
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Add Member Button */}
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer shadow-premium"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Member
        </button>
      </div>

      {/* Directory Table */}
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
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</th>
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
                        <span className="ml-3 text-sm text-gray-550 font-medium">Fetching directory...</span>
                      </div>
                    </td>
                  </tr>
                ) : members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.id} className="table-row">
                      <td className="px-6 py-4 font-semibold text-gray-800 text-sm">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-650">{member.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{member.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${statusBadges[member.status]}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-brand hover:bg-gray-100 transition-colors"
                          title="Edit member information"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(member)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No team members found matching queries.
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
        title={selectedMember ? 'Edit Team Member Details' : 'Add Team Member'}
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
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Full Name *</label>
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
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Dev"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

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
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="developer@nexix.tech"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
              {submitting ? 'Saving...' : 'Save Member'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Member Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to remove <strong className="text-gray-800">{selectedMember?.name}</strong> from the team directory?
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
              {submitting ? 'Deleting...' : 'Delete Member'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
