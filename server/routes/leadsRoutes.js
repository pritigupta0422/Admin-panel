import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/leads -> Retrieve leads with pagination and search
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.q || '';

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  try {
    const client = getSupabaseClient(req);
    let query = client.from('leads').select('*', { count: 'exact' });

    if (search) {
      // Filter by name OR service
      query = query.or(`name.ilike.%${search}%,service.ilike.%${search}%`);
    }

    // Sort by created_at descending so newest show up first
    query = query.order('created_at', { ascending: false }).range(from, to);

    const { data, error, count } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      data,
      page,
      limit,
      total: count,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error('Fetch leads error:', err);
    return res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// POST /api/leads -> Create a new lead
router.post('/', async (req, res) => {
  const { name, email, phone, service, source, notes, status } = req.body;

  if (!name || !email || !service || !source) {
    return res.status(400).json({ error: 'Name, email, service, and source are required fields' });
  }

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('leads')
      .insert([
        {
          name,
          email,
          phone,
          service,
          source,
          notes,
          status: status || 'new',
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error('Create lead error:', err);
    return res.status(500).json({ error: 'Failed to create lead' });
  }
});

// PUT /api/leads/:id -> Update a lead
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, service, source, notes, status } = req.body;

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('leads')
      .update({
        name,
        email,
        phone,
        service,
        source,
        notes,
        status,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Update lead error:', err);
    return res.status(500).json({ error: 'Failed to update lead' });
  }
});

// DELETE /api/leads/:id -> Delete a lead
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = getSupabaseClient(req);
    const { error } = await client.from('leads').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Lead deleted successfully' });
  } catch (err) {
    console.error('Delete lead error:', err);
    return res.status(500).json({ error: 'Failed to delete lead' });
  }
});

export default router;
