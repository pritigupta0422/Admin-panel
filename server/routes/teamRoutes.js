import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/team -> Get all team members, optionally search by name or department
router.get('/', async (req, res) => {
  const search = req.query.q || '';

  try {
    const client = getSupabaseClient(req);
    let query = client.from('team_members').select('*');

    if (search) {
      // Search by name or department
      query = query.or(`name.ilike.%${search}%,department.ilike.%${search}%`);
    }

    // Order by name ascending
    query = query.order('name', { ascending: true });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Fetch team error:', err);
    return res.status(500).json({ error: 'Failed to retrieve team members' });
  }
});

// POST /api/team -> Add team member
router.post('/', async (req, res) => {
  const { name, role, department, email, status } = req.body;

  if (!name || !role || !department || !email) {
    return res.status(400).json({ error: 'Name, role, department, and email are required fields' });
  }

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('team_members')
      .insert([
        {
          name,
          role,
          department,
          email,
          status: status || 'active',
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error('Create team member error:', err);
    return res.status(500).json({ error: 'Failed to add team member' });
  }
});

// PUT /api/team/:id -> Update team member
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, role, department, email, status } = req.body;

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('team_members')
      .update({
        name,
        role,
        department,
        email,
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
    console.error('Update team member error:', err);
    return res.status(500).json({ error: 'Failed to update team member' });
  }
});

// DELETE /api/team/:id -> Delete team member
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = getSupabaseClient(req);
    const { error } = await client.from('team_members').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Team member deleted successfully' });
  } catch (err) {
    console.error('Delete team member error:', err);
    return res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;
