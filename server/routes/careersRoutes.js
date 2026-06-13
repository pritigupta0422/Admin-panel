import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/careers -> Retrieve all job listings
router.get('/', async (req, res) => {
  const search = req.query.q || '';

  try {
    const client = getSupabaseClient(req);
    let query = client.from('careers').select('*');

    if (search) {
      query = query.or(`position.ilike.%${search}%,department.ilike.%${search}%`);
    }

    // Sort by created_at descending
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Fetch careers error:', err);
    return res.status(500).json({ error: 'Failed to retrieve job listings' });
  }
});

// POST /api/careers -> Create a new job listing
router.post('/', async (req, res) => {
  const { position, department, type, description, status, applicants } = req.body;

  if (!position || !department || !type) {
    return res.status(400).json({ error: 'Position, department, and type are required fields' });
  }

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('careers')
      .insert([
        {
          position,
          department,
          type,
          description,
          status: status || 'draft',
          applicants: applicants || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error('Create career error:', err);
    return res.status(500).json({ error: 'Failed to create job listing' });
  }
});

// PUT /api/careers/:id -> Update a job listing
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { position, department, type, description, status, applicants } = req.body;

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('careers')
      .update({
        position,
        department,
        type,
        description,
        status,
        applicants,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Update career error:', err);
    return res.status(500).json({ error: 'Failed to update job listing' });
  }
});

// DELETE /api/careers/:id -> Delete a job listing
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = getSupabaseClient(req);
    const { error } = await client.from('careers').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Job listing deleted successfully' });
  } catch (err) {
    console.error('Delete career error:', err);
    return res.status(500).json({ error: 'Failed to delete job listing' });
  }
});

export default router;
