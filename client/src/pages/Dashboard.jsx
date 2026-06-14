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
        <Loader2 className="w-8 h-8 text-black animate-spin" />
        <span className="ml-3 text-sm font-medium text-gray-500">Compiling workspace metrics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[#fafafa] border-0.5 border-[#e4e4e7] rounded-lg text-black text-sm max-w-lg mx-auto mt-8">
        {error}
      </div>
    );
  }

  const { metrics, recentLeads, recentBlogs, portfolioHighlights, topServices } = data;

  const leadBadgeColors = {
    new: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full',
    in_progress: 'bg-[#f4f4f5] text-[#3f3f46] border border-[#e4e4e7] rounded-full',
    done: 'bg-[#0a0a0a] text-white border border-transparent rounded-full',
  };

  const blogBadgeColors = {
    published: 'bg-[#0a0a0a] text-white border border-transparent rounded-full',
    draft: 'bg-slate-50 text-slate-450 border border-slate-200 rounded-full',
    pending: 'bg-[#fafafa] text-[#71717a] border border-[#a1a1aa] rounded-full',
  };

  // Calculate highest count to scale visual bar charts
  const maxServiceCount = topServices.length > 0 ? Math.max(...topServices.map(s => s.count)) : 1;

  return (
    <div className="space-y-6">
      
      {/* 4 Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Leads Card */}
        <div className="metric-card-bg p-5 bg-[#0a0a0a] text-white rounded-xl shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group border border-[#1a1a1a]">
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 100 40" fill="none">
              <path d="M0 20H30L35 10L40 30L45 15L50 25L55 20H100" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="h-full flex flex-col justify-between z-10">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">Total Leads</span>
            <span className="text-[32px] font-extrabold text-white tracking-tight mt-1.5 block leading-none text-left">{metrics.leads.total}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-white text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full select-none">
                {metrics.leads.subLabel || '↑ vs last month'}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform z-10"><FileText className="w-4.5 h-4.5" /></div>
        </div>

        {/* Total Projects Card */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider block">Total Projects</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none text-left">{metrics.projects.total}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                {metrics.projects.subLabel || '↑ vs last month'}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><Briefcase className="w-4.5 h-4.5" /></div>
        </div>

        {/* Blog Posts Card */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider block">Blog Posts</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none text-left">{metrics.blogPosts.total}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                {metrics.blogPosts.subLabel || '↑ vs last month'}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><BookOpen className="w-4.5 h-4.5" /></div>
        </div>

        {/* Team Members Card */}
        <div className="metric-card-bg p-5 bg-white rounded-xl border border-[#e4e4e7] shadow-premium flex items-start justify-between relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium-card group">
          <div className="h-full flex flex-col justify-between">
            <span className="text-[11px] font-bold text-[#71717a] uppercase tracking-wider block">Team Members</span>
            <span className="text-[32px] font-extrabold text-[#0a0a0a] tracking-tight mt-1.5 block leading-none text-left">{metrics.teamMembers.total}</span>
            <div className="flex items-center gap-1.5 mt-3.5">
              <span className="inline-flex bg-[#f4f4f5] text-[#3f3f46] font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-[#e4e4e7] select-none">
                {metrics.teamMembers.subLabel || '↑ vs last month'}
              </span>
            </div>
          </div>
          <div className="w-10 h-10 bg-[#f4f4f5] text-[#0a0a0a] rounded-lg flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform border border-[#e4e4e7]"><Users className="w-4.5 h-4.5" /></div>
        </div>

      </div>

      {/* Main Panels Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads Panel (Left Column) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-premium flex flex-col h-full lg:col-span-2 overflow-hidden">
          <div className="px-6 py-4.5 border-b border-slate-150 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recent Leads</h3>
            <Link to="/leads" className="border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-slate-500 hover:bg-[#0a0a0a] hover:text-white transition-all cursor-pointer inline-flex items-center">
              Manage Leads <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="flex-1 overflow-x-auto min-w-full">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-slate-450 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.length > 0 ? (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="table-row">
                      <td className="px-6 py-3.5 text-xs font-bold text-slate-800 text-left">{lead.name}</td>
                      <td className="px-6 py-3.5 text-xs font-semibold text-slate-655 text-left">{lead.service}</td>
                      <td className="px-6 py-3.5 text-left">
                        <span className={`px-2.5 py-0.8 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${leadBadgeColors[lead.status] || 'bg-slate-100 text-slate-500'}`}>
                          {lead.status?.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center text-xs text-slate-400">No leads recorded.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services Panel (Right Column) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-premium flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-5 text-left">Top Services</h3>
            <div className="space-y-4">
              {topServices.length > 0 ? (
                topServices.slice(0, 5).map((service) => {
                  const percentage = Math.max(5, (service.count / maxServiceCount) * 100);
                  return (
                    <div key={service.name} className="space-y-1.5 text-left">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{service.name}</span>
                        <span className="text-[#0a0a0a]">{service.count} leads</span>
                      </div>
                      <div className="w-full bg-[#F4F4F5] h-3 rounded-lg overflow-hidden relative flex items-center shadow-inner">
                        <div 
                          className="bg-[#0a0a0a]/10 h-full border-r-[3px] border-[#0a0a0a] transition-all duration-350 relative bar-shimmer" 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-xs text-slate-400 py-8">No service data loaded.</div>
              )}
            </div>
          </div>
          {topServices.length > 0 && (
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              <span>Dynamic metrics from leads</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#0a0a0a]" />
            </div>
          )}
        </div>

      </div>

      {/* Highlights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Portfolio Highlights (Left Column - 6 Items 3-col Grid) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-premium p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Portfolio Highlights</h3>
            <Link to="/portfolio" className="border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-slate-500 hover:bg-[#0a0a0a] hover:text-white transition-all cursor-pointer inline-flex items-center">
              Manage Projects <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioHighlights.length > 0 ? (
              portfolioHighlights.map((project) => (
                <div 
                  key={project.id} 
                  className="p-4 bg-slate-55/40 border border-slate-100 rounded-lg flex flex-col justify-between hover:shadow-sm hover:border-slate-200 transition-all duration-150 text-left"
                >
                  <span className="text-[9px] font-bold text-[#0a0a0a] uppercase tracking-wider block mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                    {project.name}
                  </h4>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-xs text-slate-400 py-8 col-span-3">No portfolio highlights.</div>
            )}
          </div>
        </div>

        {/* Latest Blog Posts Panel (Right Column) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-premium p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Latest Blog Posts</h3>
            <Link to="/blog" className="border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-slate-500 hover:bg-[#0a0a0a] hover:text-white transition-all cursor-pointer inline-flex items-center">
              Manage Blog <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </div>
          <div className="flex-1">
            <ol className="divide-y divide-slate-100">
              {recentBlogs.length > 0 ? (
                recentBlogs.map((post, index) => (
                  <li key={post.id} className="py-2.5 flex items-start text-left border-b border-dashed border-slate-100 last:border-b-0">
                    <span className="text-[10px] font-extrabold text-slate-350 mr-3 mt-0.5 w-4 text-right select-none">{index + 1}.</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1 hover:text-[#0a0a0a] transition-colors leading-tight">
                        {post.title}
                      </h4>
                      <div className="flex items-center mt-1 text-[10px] text-slate-400 space-x-2">
                        <span>by {post.author}</span>
                        <span>•</span>
                        <span className={`px-1.5 py-0.2 rounded text-[9px] uppercase font-bold tracking-wider ${blogBadgeColors[post.status] || 'bg-slate-100 text-slate-550'}`}>
                          {post.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-center text-xs text-slate-400 py-8">No posts found.</li>
              )}
            </ol>
          </div>
        </div>

      </div>

    </div>
  );
}
