import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/dashboard/summary -> Retrieve all dashboard stats in one parallel request
router.get('/summary', async (req, res) => {
  try {
    const client = getSupabaseClient(req);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneWeekAgoStr = oneWeekAgo.toISOString();

    // Run parallel queries using Promise.all to fetch metrics and preview panels
    const [
      totalLeadsRes,
      newLeadsRes,
      recentLeadsRes,
      allLeadsServicesRes,
      totalProjectsRes,
      liveProjectsRes,
      portfolioHighlightsRes,
      totalBlogsRes,
      pendingBlogsRes,
      recentBlogsRes,
      totalTeamRes,
      activeTeamRes,
    ] = await Promise.all([
      // Leads metrics
      client.from('leads').select('*', { count: 'exact', head: true }),
      client.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', oneWeekAgoStr),
      client.from('leads').select('id, name, service, status, created_at').order('created_at', { ascending: false }).limit(5),
      client.from('leads').select('service'),

      // Portfolio metrics
      client.from('portfolio').select('*', { count: 'exact', head: true }),
      client.from('portfolio').select('*', { count: 'exact', head: true }).eq('visible', true),
      client.from('portfolio').select('id, name, category, created_at').order('created_at', { ascending: false }).limit(6),

      // Blog metrics
      client.from('blog_posts').select('*', { count: 'exact', head: true }),
      client.from('blog_posts').select('*', { count: 'exact', head: true }).in('status', ['draft', 'pending']),
      client.from('blog_posts').select('id, title, author, status, created_at').order('created_at', { ascending: false }).limit(5),

      // Team metrics
      client.from('team_members').select('*', { count: 'exact', head: true }),
      client.from('team_members').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

    // Error checking
    const errors = [
      totalLeadsRes.error,
      newLeadsRes.error,
      recentLeadsRes.error,
      allLeadsServicesRes.error,
      totalProjectsRes.error,
      liveProjectsRes.error,
      portfolioHighlightsRes.error,
      totalBlogsRes.error,
      pendingBlogsRes.error,
      recentBlogsRes.error,
      totalTeamRes.error,
      activeTeamRes.error,
    ].filter(Boolean);

    if (errors.length > 0) {
      console.error('Database errors fetching dashboard stats:', errors);
      return res.status(400).json({ error: 'Failed to retrieve some dashboard metrics', details: errors });
    }

    // Process Top Services (frequency breakdown)
    const serviceCounts = {};
    if (allLeadsServicesRes.data) {
      allLeadsServicesRes.data.forEach(item => {
        const srv = item.service || 'Other';
        serviceCounts[srv] = (serviceCounts[srv] || 0) + 1;
      });
    }
    
    // Format service counts for the bar chart
    const topServices = Object.entries(serviceCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return res.json({
      metrics: {
        leads: {
          total: totalLeadsRes.count || 0,
          subLabel: `${newLeadsRes.count || 0} new this week`
        },
        projects: {
          total: totalProjectsRes.count || 0,
          subLabel: `${liveProjectsRes.count || 0} live on site`
        },
        blogPosts: {
          total: totalBlogsRes.count || 0,
          subLabel: `${pendingBlogsRes.count || 0} drafts pending`
        },
        teamMembers: {
          total: totalTeamRes.count || 0,
          subLabel: `${activeTeamRes.count || 0} active`
        }
      },
      recentLeads: recentLeadsRes.data || [],
      recentBlogs: recentBlogsRes.data || [],
      portfolioHighlights: portfolioHighlightsRes.data || [],
      topServices,
    });
  } catch (err) {
    console.error('Dashboard summary API error:', err);
    return res.status(500).json({ error: 'Failed to process dashboard metrics request' });
  }
});

export default router;
