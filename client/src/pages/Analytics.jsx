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
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
        <span className="ml-3 text-sm font-medium text-gray-500">Querying traffic database...</span>
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

  const maxViews = topPages.length > 0 ? Math.max(...topPages.map(p => p.views)) : 1;

  return (
    <div className="space-y-6">
      
      {/* Date Range Selector Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium">Reporting Window Settings</span>
        </div>
        
        {/* Date Filter Selector */}
        <select
          value={range}
          onChange={e => setRange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand cursor-pointer"
        >
          <option value="this_week">This Week (Last 7 Days)</option>
          <option value="this_month">This Month (Last 30 Days)</option>
          <option value="last_3_months">Last 3 Months (Last 90 Days)</option>
        </select>
      </div>

      {/* Analytics Loader for subsequent changes */}
      {loading && (
        <div className="flex items-center text-xs text-brand font-medium">
          <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
          Refreshing dashboard cards...
        </div>
      )}

      {/* 4 Metric Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Page Views */}
          <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Page Views</span>
              <span className="text-2xl font-bold text-gray-900 block">{summary.pageViews.value.toLocaleString()}</span>
              <div className="flex items-center text-[11px] text-green-600 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                <span>{summary.pageViews.change} vs prev period</span>
              </div>
            </div>
            <div className="p-2 bg-brand-light text-brand rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
          </div>

          {/* Unique Visitors */}
          <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Unique Visitors</span>
              <span className="text-2xl font-bold text-gray-900 block">{summary.uniqueVisitors.value.toLocaleString()}</span>
              <div className="flex items-center text-[11px] text-green-600 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                <span>{summary.uniqueVisitors.change} vs prev period</span>
              </div>
            </div>
            <div className="p-2 bg-brand-light text-brand rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Avg Time on Site */}
          <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Avg. Time on Site</span>
              <span className="text-2xl font-bold text-gray-900 block">{summary.avgTimeOnSite.value}</span>
              <div className="flex items-center text-[11px] text-green-600 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                <span>{summary.avgTimeOnSite.change} vs prev period</span>
              </div>
            </div>
            <div className="p-2 bg-brand-light text-brand rounded-lg">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          {/* Lead Conversion Rate */}
          <div className="bg-white p-5 rounded-lg border-0.5 border-gray-200 shadow-premium flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Lead Conversion Rate</span>
              <span className="text-2xl font-bold text-gray-900 block">{summary.leadConversionRate.value}</span>
              <div className="flex items-center text-[11px] text-green-600 font-semibold mt-1.5">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                <span>{summary.leadConversionRate.change} vs prev period</span>
              </div>
            </div>
            <div className="p-2 bg-brand-light text-brand rounded-lg">
              <Percent className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Top Pages Section with Horizontal Bar Chart */}
      <div className="bg-white rounded-lg border-0.5 border-gray-200 shadow-premium p-6">
        <h3 className="font-semibold text-gray-800 mb-6">Top Pages Performance</h3>
        
        <div className="space-y-5">
          {topPages.length > 0 ? (
            topPages.map((item) => {
              // Calculate width percentage
              const percentage = Math.max(4, (item.views / maxViews) * 100);
              
              return (
                <div key={item.page} className="flex items-center space-x-4">
                  {/* Page Path Label */}
                  <div className="w-32 sm:w-44 truncate text-sm font-semibold text-gray-700 hover:text-brand transition-colors">
                    {item.page}
                  </div>
                  
                  {/* Visually Segmented Progress Bar */}
                  <div className="flex-1">
                    <div className="w-full bg-gray-150 h-6 rounded-md overflow-hidden relative flex items-center">
                      <div 
                        className="bg-brand-light h-full border-r-2 border-brand/20 transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      />
                      <span className="absolute left-3 text-xs font-semibold text-brand">
                        {item.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                  
                  {/* Unique Visitor statistics */}
                  <div className="text-xs text-gray-405 font-medium min-w-[90px] text-right hidden sm:block">
                    {item.unique_visitors.toLocaleString()} uniques
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-sm text-gray-450 py-12">
              No page view metrics recorded in this date range.
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
