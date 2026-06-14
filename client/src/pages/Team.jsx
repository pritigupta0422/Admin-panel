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
    active: 'bg-[#0a0a0a] text-white border border-transparent rounded-full',
    inactive: 'bg-slate-50 text-slate-400 border border-slate-200 rounded-full'
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white shadow-sm focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
          />
        </div>

        {/* Add Member Button */}
        <button
          onClick={handleOpenCreate}
          className="h-10 px-5 bg-[#0a0a0a] hover:bg-[#1f1f1f] active:scale-[0.97] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-1.5 shrink-0 stroke-[2.5]" />
          Add Member
        </button>
      </div>

      {/* Directory Table */}
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
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3.5 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Email</th>
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
                        <span className="ml-3 text-xs text-slate-555 font-bold">Fetching directory...</span>
                      </div>
                    </td>
                  </tr>
                ) : members.length > 0 ? (
                  members.map((member) => (
                    <tr key={member.id} className="table-row">
                      <td className="px-6 py-3.5 font-bold text-slate-800 text-xs text-left">{member.name}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-655 font-semibold text-left">{member.role}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-500 text-left">{member.department}</td>
                      <td className="px-6 py-3.5 text-xs text-slate-450 text-left">{member.email}</td>
                      <td className="px-6 py-3.5 text-left">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] ${statusBadges[member.status]}`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(member)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-[#0a0a0a] active:scale-[0.97] transition-all"
                          title="Edit member information"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(member)}
                          className="p-1.5 rounded-md text-slate-400 hover:text-black transition-colors duration-150 active:scale-[0.97] transition-all"
                          title="Remove member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-xs text-slate-450">
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
            <div className="p-3 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-xs text-black flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {formError}
            </div>
          )}

          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Role *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Frontend Dev"
                  className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

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
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                placeholder="developer@nexix.tech"
                className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block mb-1.5">Status</label>
              <select
                className="w-full h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
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
          <p className="text-xs text-slate-500 leading-relaxed">
            Are you sure you want to remove <strong className="text-slate-800">{selectedMember?.name}</strong> from the team directory?
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
              {submitting ? 'Deleting...' : 'Delete Member'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
