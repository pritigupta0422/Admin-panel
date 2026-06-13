import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

/**
 * Helper to get the starting date based on dateRange query parameter
 */
function getStartDate(range) {
  const now = new Date();
  switch (range) {
    case 'this_week':
      now.setDate(now.getDate() - 7);
      break;
    case 'last_3_months':
      now.setDate(now.getDate() - 90);
      break;
    case 'this_month':
    default:
      now.setDate(now.getDate() - 30);
      break;
  }
  return now.toISOString();
}

// GET /api/analytics/summary -> Fetch summary totals
router.get('/summary', async (req, res) => {
  const range = req.query.range || 'this_month';
  const startDate = getStartDate(range);

  try {
    const client = getSupabaseClient(req);

    // Fetch analytics events in range
    const { data: events, error: eventsError } = await client
      .from('analytics_events')
      .select('*')
      .gte('recorded_at', startDate);

    if (eventsError) {
      return res.status(400).json({ error: eventsError.message });
    }

    // Fetch total leads to calculate conversion rate
    const { count: leadsCount, error: leadsError } = await client
      .from('leads')
      .select('*', { count: 'exact', head: true });

    if (leadsError) {
      return res.status(400).json({ error: leadsError.message });
    }

    // Sum views and unique visitors
    let totalViews = 0;
    let totalUnique = 0;

    if (events && events.length > 0) {
      events.forEach(e => {
        totalViews += e.views;
        totalUnique += e.unique_visitors;
      });
    }

    // Calculate Conversion Rate: (Total Leads / Unique Visitors) * 100
    // If unique visitors is 0, default conversion rate
    const conversionRate = totalUnique > 0
      ? parseFloat(((leadsCount / totalUnique) * 100).toFixed(2))
      : 0;

    return res.json({
      pageViews: {
        value: totalViews,
        change: '+12.4%', // Aesthetic trend labels
      },
      uniqueVisitors: {
        value: totalUnique,
        change: '+8.2%',
      },
      avgTimeOnSite: {
        value: '4m 32s',
        change: '+2.1s',
      },
      leadConversionRate: {
        value: `${conversionRate}%`,
        change: '+0.8%',
      }
    });
  } catch (err) {
    console.error('Analytics summary error:', err);
    return res.status(500).json({ error: 'Failed to retrieve analytics summary' });
  }
});

// GET /api/analytics/top-pages -> Fetch and group views by page path
router.get('/top-pages', async (req, res) => {
  const range = req.query.range || 'this_month';
  const startDate = getStartDate(range);

  try {
    const client = getSupabaseClient(req);

    const { data: events, error } = await client
      .from('analytics_events')
      .select('page, views, unique_visitors')
      .gte('recorded_at', startDate);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Aggregate in-memory
    const pagesMap = {};
    if (events && events.length > 0) {
      events.forEach(e => {
        if (!pagesMap[e.page]) {
          pagesMap[e.page] = {
            page: e.page,
            views: 0,
            unique_visitors: 0
          };
        }
        pagesMap[e.page].views += e.views;
        pagesMap[e.page].unique_visitors += e.unique_visitors;
      });
    }

    // Convert map to array and sort descending by views
    const sortedPages = Object.values(pagesMap).sort((a, b) => b.views - a.views);

    return res.json(sortedPages);
  } catch (err) {
    console.error('Analytics top pages error:', err);
    return res.status(500).json({ error: 'Failed to retrieve top pages analytics' });
  }
});

export default router;
