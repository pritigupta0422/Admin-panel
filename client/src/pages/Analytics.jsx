import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  Eye, 
  Users, 
  Clock, 
  Percent, 
  Calendar,
  Loader2, 
  ArrowUpRight
} from 'lucide-react';

export default function Analytics() {
  const [range, setRange] = useState('this_month');
  const [summary, setSummary] = useState(null);
  const [topPages, setTopPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const [summaryRes, pagesRes] = await Promise.all([
          api.get(`/analytics/summary?range=${range}`),
          api.get(`/analytics/top-pages?range=${range}`)
        ]);
        
        setSummary(summaryRes.data);
        setTopPages(pagesRes.data);
      } catch (err) {
        console.error('Fetch analytics error:', err);
        setError('Failed to retrieve analytics metrics.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [range]);

  if (loading && !summary) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#0a0a0a] animate-spin" />
        <span className="ml-3 text-xs font-bold text-slate-555">Querying traffic database...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-[#fafafa] border border-[#e4e4e7] rounded-lg text-zinc-500 text-sm max-w-lg mx-auto mt-8">
        {error}
      </div>
    );
  }

  const maxViews = topPages.length > 0 ? Math.max(...topPages.map(p => p.views)) : 1;

  return (
    <div className="space-y-6">
      
      {/* Date Range Selector Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-premium">
        <div className="flex items-center text-slate-700">
          <Calendar className="w-4 h-4 text-[#0a0a0a] mr-2 stroke-[2]" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-450">Reporting Window Settings</span>
        </div>
        
        {/* Date Filter Selector */}
        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          className="h-10 px-3.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white focus:outline-none focus:border-[#0a0a0a] focus:ring-2 focus:ring-[#0a0a0a]/10 transition-all cursor-pointer"
        >
          <option value="this_week">This Week (Last 7 Days)</option>
          <option value="this_month">This Month (Last 30 Days)</option>
          <option value="last_3_months">Last 3 Months (Last 90 Days)</option>
        </select>
      </div>

      {/* Analytics Loader for subsequent changes */}
      {loading && (
        <div className="flex items-center text-xs text-[#0a0a0a] font-bold">
          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
          Refreshing dashboard cards...
        </div>
      )}

      {/* 4 Metric Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Page Views */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Page Views</span>
              <span className="text-2xl font-black text-slate-800 block tracking-tight">{summary.pageViews.value.toLocaleString()}</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#fafafa] border border-zinc-200 text-[10px] font-bold text-[#0a0a0a] mt-1.5">
                <ArrowUpRight className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                <span>{summary.pageViews.change} vs prev</span>
              </div>
            </div>
            <div className="p-2 bg-[#0a0a0a]/5 text-[#0a0a0a] rounded-lg">
              <Eye className="w-5 h-5 stroke-[2]" />
            </div>
          </div>

          {/* Unique Visitors */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Unique Visitors</span>
              <span className="text-2xl font-black text-slate-800 block tracking-tight">{summary.uniqueVisitors.value.toLocaleString()}</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#fafafa] border border-zinc-200 text-[10px] font-bold text-[#0a0a0a] mt-1.5">
                <ArrowUpRight className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                <span>{summary.uniqueVisitors.change} vs prev</span>
              </div>
            </div>
            <div className="p-2 bg-[#0a0a0a]/5 text-[#0a0a0a] rounded-lg">
              <Users className="w-5 h-5 stroke-[2]" />
            </div>
          </div>

          {/* Avg Time on Site */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Avg. Time on Site</span>
              <span className="text-2xl font-black text-slate-800 block tracking-tight">{summary.avgTimeOnSite.value}</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#fafafa] border border-zinc-200 text-[10px] font-bold text-[#0a0a0a] mt-1.5">
                <ArrowUpRight className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                <span>{summary.avgTimeOnSite.change} vs prev</span>
              </div>
            </div>
            <div className="p-2 bg-[#0a0a0a]/5 text-[#0a0a0a] rounded-lg">
              <Clock className="w-5 h-5 stroke-[2]" />
            </div>
          </div>

          {/* Lead Conversion Rate */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Lead Conversion Rate</span>
              <span className="text-2xl font-black text-slate-800 block tracking-tight">{summary.leadConversionRate.value}</span>
              <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-[#fafafa] border border-zinc-200 text-[10px] font-bold text-[#0a0a0a] mt-1.5">
                <ArrowUpRight className="w-3 h-3 mr-0.5 stroke-[2.5]" />
                <span>{summary.leadConversionRate.change} vs prev</span>
              </div>
            </div>
            <div className="p-2 bg-[#0a0a0a]/5 text-[#0a0a0a] rounded-lg">
              <Percent className="w-5 h-5 stroke-[2]" />
            </div>
          </div>
        </div>
      )}

      {/* Top Pages Section with Horizontal Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-premium p-6">
        <h3 className="font-bold text-xs text-slate-455 uppercase tracking-wider mb-6">Top Pages Performance</h3>
        
        <div className="space-y-5">
          {topPages.length > 0 ? (
            topPages.map((item) => {
              // Calculate width percentage
              const percentage = Math.max(4, (item.views / maxViews) * 100);
              
              return (
                <div key={item.page} className="flex items-center space-x-4">
                  {/* Page Path Label */}
                  <div className="w-32 sm:w-44 truncate text-xs font-bold text-slate-700 hover:text-[#0a0a0a] transition-colors cursor-pointer">
                    {item.page}
                  </div>
                  
                  {/* Visually Segmented Progress Bar */}
                  <div className="flex-1">
                    <div className="w-full bg-slate-50 border border-slate-200/60 h-6 rounded-lg overflow-hidden relative flex items-center">
                      <div 
                        className="bg-[#0a0a0a]/10 h-full border-r-2 border-[#0a0a0a] transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="absolute left-3 text-[10px] font-bold text-[#0a0a0a]">
                        {item.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                  
                  {/* Unique Visitor statistics */}
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider min-w-[90px] text-right hidden sm:block">
                    {item.unique_visitors.toLocaleString()} uniques
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-xs text-slate-450 py-12">
              No page view metrics recorded in this date range.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
