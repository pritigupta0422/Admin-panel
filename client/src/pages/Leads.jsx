import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Modal from '../components/Modal';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  AlertCircle
} from 'lucide-react';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Pagination states
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    source: '',
    notes: '',
    status: 'new'
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch leads on page or search change
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/leads?page=${page}&limit=10&q=${searchTerm}`);
        setLeads(res.data.data);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.total);
      } catch (err) {
        console.error('Fetch leads error:', err);
        setError('Failed to fetch leads. Make sure you are logged in.');
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchLeads();
    }, 250);

    return () => clearTimeout(timer);
  }, [page, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to page 1 on new search
  };

  // Open modal for Create
  const handleOpenCreate = () => {
    setSelectedLead(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      source: '',
      notes: '',
      status: 'new'
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || '',
      service: lead.service,
      source: lead.source,
      notes: lead.notes || '',
      status: lead.status
    });
    setFormError('');
    setIsFormModalOpen(true);
  };

  // Open modal for Delete
  const handleOpenDelete = (lead) => {
    setSelectedLead(lead);
    setIsDeleteModalOpen(true);
  };

  // Submit Add or Edit Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.source.trim()) {
      setFormError('Name, email, service, and source are required fields.');
      return;
    }

    setSubmitting(true);
    try {
      if (selectedLead) {
        // Update
        const res = await api.put(`/leads/${selectedLead.id}`, formData);
        setLeads(leads.map(l => l.id === selectedLead.id ? res.data : l));
      } else {
        // Create
        const res = await api.post('/leads', formData);
        setLeads([res.data, ...leads].slice(0, 10)); // Keep pagination page size bounds
        setTotalItems(prev => prev + 1);
      }
      setIsFormModalOpen(false);
    } catch (err) {
      console.error('Submit lead error:', err);
      setFormError(err.response?.data?.error || 'Failed to submit lead data.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Delete operation
  const handleDeleteSubmit = async () => {
    setSubmitting(true);
    try {
      await api.delete(`/leads/${selectedLead.id}`);
      setLeads(leads.filter(l => l.id !== selectedLead.id));
      setTotalItems(prev => Math.max(0, prev - 1));
      
      // If deleted last item on current page, go back a page
      if (leads.length === 1 && page > 1) {
        setPage(prev => prev - 1);
      }
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error('Delete lead error:', err);
      alert('Failed to delete lead. Check backend server logs.');
    } finally {
      setSubmitting(false);
    }
  };

  const badgeClasses = {
    new: 'bg-status-blue-bg text-status-blue-text',
    in_progress: 'bg-status-orange-bg text-status-orange-text',
    done: 'bg-status-green-bg text-status-green-text'
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        {/* Search Bar Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4.5 h-4.5" />
          </div>
          <input
            type="text"
            placeholder="Search leads by name or service..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand"
          />
        </div>

        {/* Add New Lead Trigger */}
        <button
          onClick={handleOpenCreate}
          className="flex items-center justify-center px-4 py-2 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors cursor-pointer shadow-premium"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Lead
        </button>
      </div>

      {/* Main Table Panel */}
      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm max-w-md mx-auto">
          {error}
        </div>
      ) : (
        <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-gray-150 text-left bg-gray-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 relative">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="w-6 h-6 text-brand animate-spin" />
                        <span className="ml-3 text-sm text-gray-500 font-medium">Fetching lead files...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr key={lead.id} className="table-row">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-800">{lead.name}</div>
                        <div className="text-xs text-gray-400">{lead.email}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.service}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(lead.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${badgeClasses[lead.status]}`}>
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEdit(lead)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-brand hover:bg-gray-100 transition-colors"
                          title="Edit lead details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(lead)}
                          className="p-1.5 inline-flex rounded-md text-gray-400 hover:text-red-650 hover:bg-red-50 transition-colors"
                          title="Remove lead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                      No leads matched your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {!loading && totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Showing page <strong className="text-gray-600">{page}</strong> of <strong className="text-gray-600">{totalPages}</strong> ({totalItems} leads)
              </span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 border border-gray-300 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE & EDIT FORM MODAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedLead ? 'Edit Lead Details' : 'Add New Lead Entry'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-650 flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Name *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Email *</label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Phone</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Service *</label>
              <input
                type="text"
                required
                placeholder="e.g. Web Development"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Source *</label>
              <input
                type="text"
                required
                placeholder="e.g. Google Search"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.source}
                onChange={e => setFormData({ ...formData, source: e.target.value })}
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-1">Notes</label>
              <textarea
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-brand focus:border-brand"
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-600 hover:bg-gray-150 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-brand text-white text-sm font-semibold rounded-md hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              {submitting ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRMATION DIALOG */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Lead Deletion"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500 leading-relaxed">
            Are you sure you want to delete lead <strong className="text-gray-800">{selectedLead?.name}</strong>? This action is permanent and cannot be undone.
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
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Deleting...' : 'Delete Lead'}
            </button>
          </div>
        </div>
      </Modal>

    </div>
  );
}
