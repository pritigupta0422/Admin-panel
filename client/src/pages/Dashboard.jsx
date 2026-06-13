import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  FileText, 
  Briefcase, 
  BookOpen, 
  Users, 
  Plus, 
  ArrowRight,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/dashboard/summary');
        setData(res.data);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard metrics. Check server connection.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
        <span className="ml-3 text-sm font-medium text-gray-500">Compiling workspace metrics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border-0.5 border-red-200 rounded-lg text-red-700 text-sm max-w-lg mx-auto mt-8">
        {error}
      </div>
    );
  }

  const { metrics, recentLeads, recentBlogs, portfolioHighlights, topServices } = data;

  const leadBadgeColors = {
    new: 'bg-status-blue-bg text-status-blue-text',
    in_progress: 'bg-status-orange-bg text-status-orange-text',
    done: 'bg-status-green-bg text-status-green-text',
  };

  const blogBadgeColors = {
    published: 'bg-status-green-bg text-status-green-text',
    draft: 'bg-status-orange-bg text-status-orange-text',
    pending: 'bg-status-blue-bg text-status-blue-text',
  };

  // Calculate highest count to scale visual bar charts
  const maxServiceCount = topServices.length > 0 ? Math.max(...topServices.map(s => s.count)) : 1;

  return (
    <div className="space-y-6">
      
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Leads Card */}
        <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Total Leads</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 block">{metrics.leads.total}</span>
            <span className="text-xs text-brand bg-brand-light/30 px-2 py-0.5 rounded-full inline-block mt-2 font-medium">
              {metrics.leads.subLabel}
            </span>
          </div>
          <div className="p-2.5 bg-brand-light/50 text-brand rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Total Projects Card */}
        <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Total Projects</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 block">{metrics.projects.total}</span>
            <span className="text-xs text-status-green-text bg-status-green-bg px-2 py-0.5 rounded-full inline-block mt-2 font-medium">
              {metrics.projects.subLabel}
            </span>
          </div>
          <div className="p-2.5 bg-status-green-bg text-status-green-text rounded-lg">
            <Briefcase className="w-5 h-5" />
          </div>
        </div>

        {/* Blog Posts Card */}
        <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Blog Posts</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 block">{metrics.blogPosts.total}</span>
            <span className="text-xs text-status-orange-text bg-status-orange-bg px-2 py-0.5 rounded-full inline-block mt-2 font-medium">
              {metrics.blogPosts.subLabel}
            </span>
          </div>
          <div className="p-2.5 bg-status-orange-bg text-status-orange-text rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        {/* Team Members Card */}
        <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Team Members</span>
            <span className="text-2xl font-bold text-gray-900 mt-1 block">{metrics.teamMembers.total}</span>
            <span className="text-xs text-status-green-text bg-status-green-bg px-2 py-0.5 rounded-full inline-block mt-2 font-medium">
              {metrics.teamMembers.subLabel}
            </span>
          </div>
          <div className="p-2.5 bg-status-green-bg text-status-green-text rounded-lg">
            <Users className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Main Panels Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads Panel (Left Column) */}
        <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium flex flex-col h-full lg:col-span-2">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Leads</h3>
            <Link to="/leads" className="text-xs font-semibold text-brand hover:text-brand-dark flex items-center transition-colors">
              Manage Leads <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto min-w-full">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-gray-100 text-left bg-gray-55/50">
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="table-row">
                      <td className="px-6 py-3.5 text-sm font-medium text-gray-800">{lead.name}</td>
                      <td className="px-6 py-3.5 text-sm text-gray-500">{lead.service}</td>
                      <td className="px-6 py-3.5">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${leadBadgeColors[lead.status] || 'bg-gray-100 text-gray-800'}`}>
                          {lead.status?.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-sm text-gray-400">No leads recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services Panel (Right Column) */}
        <div className="bg-white p-6 rounded-lg border-0.5 border-gray-200 shadow-premium flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-5">Top Services</h3>
            <div className="space-y-4">
              {topServices.length > 0 ? (
                topServices.slice(0, 5).map((service) => {
                  const percentage = Math.max(5, (service.count / maxServiceCount) * 100);
                  return (
                    <div key={service.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-gray-700">{service.name}</span>
                        <span className="text-brand">{service.count} leads</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-brand h-full rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-sm text-gray-400 py-8">No service data loaded.</div>
              )}
            </div>
          </div>
          {topServices.length > 0 && (
            <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-400">
              <span>Dynamic metric aggregated from leads</span>
              <TrendingUp className="w-4 h-4 text-brand" />
            </div>
          )}
        </div>

      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Portfolio Highlights (Left Column - 6 Items 3-col Grid) */}
        <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">Portfolio Highlights</h3>
            <Link to="/portfolio" className="text-xs font-semibold text-brand hover:text-brand-dark flex items-center transition-colors">
              Manage Projects <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioHighlights.length > 0 ? (
              portfolioHighlights.map((project) => (
                <div 
                  key={project.id} 
                  className="p-4 bg-gray-55/40 border-0.5 border-gray-100 rounded-lg flex flex-col justify-between hover:shadow-xs hover:border-gray-200 transition-all duration-150"
                >
                  <span className="text-[10px] font-bold text-brand uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {project.name}
                  </h4>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-sm text-gray-400 py-8">No portfolio highlights.</div>
            )}
          </div>
        </div>

        {/* Latest Blog Posts Panel (Right Column) */}
        <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-gray-800">Latest Blog Posts</h3>
            <Link to="/blog" className="text-xs font-semibold text-brand hover:text-brand-dark flex items-center transition-colors">
              Manage Blog <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="flex-1">
            <ol className="divide-y divide-gray-100">
              {recentBlogs.length > 0 ? (
                recentBlogs.map((post, index) => (
                  <li key={post.id} className="py-2.5 flex items-start">
                    <span className="text-xs font-bold text-gray-400 mr-3 mt-0.5">{index + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-1 hover:text-brand transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center mt-1 text-[11px] text-gray-400 space-x-2">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-semibold tracking-wider ${blogBadgeColors[post.status] || 'bg-gray-100 text-gray-800'}`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-sm text-gray-400 py-8">No posts found.</li>
              )}
            </ol>
          </div>
        </div>

      </div>

    </div>
  );
}
