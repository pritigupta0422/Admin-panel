import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/portfolio -> Retrieve projects with search / filter
router.get('/', async (req, res) => {
  const search = req.query.q || '';
  const category = req.query.category || '';
  const clientFilter = req.query.client || '';

  try {
    const client = getSupabaseClient(req);
    let query = client.from('portfolio').select('*');

    // Text search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,client.ilike.%${search}%,category.ilike.%${search}%`);
    }

    // Exact category filter if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Exact client filter if provided
    if (clientFilter) {
      query = query.eq('client', clientFilter);
    }

    // Sort by created_at descending
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Fetch portfolio error:', err);
    return res.status(500).json({ error: 'Failed to retrieve portfolio' });
  }
});

// POST /api/portfolio -> Add new project
router.post('/', async (req, res) => {
  const { name, category, tech_stack, client, description, visible } = req.body;

  if (!name || !category || !tech_stack || !client) {
    return res.status(400).json({ error: 'Name, category, tech stack, and client are required fields' });
  }

  try {
    const supabaseClient = getSupabaseClient(req);
    const { data, error } = await supabaseClient
      .from('portfolio')
      .insert([
        {
          name,
          category,
          tech_stack,
          client,
          description,
          visible: visible !== undefined ? visible : true,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error('Create project error:', err);
    return res.status(500).json({ error: 'Failed to create portfolio project' });
  }
});

// PUT /api/portfolio/:id -> Edit project
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, tech_stack, client, description, visible } = req.body;

  try {
    const supabaseClient = getSupabaseClient(req);
    const { data, error } = await supabaseClient
      .from('portfolio')
      .update({
        name,
        category,
        tech_stack,
        client,
        description,
        visible,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Update project error:', err);
    return res.status(500).json({ error: 'Failed to update portfolio project' });
  }
});

// DELETE /api/portfolio/:id -> Delete project
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const supabaseClient = getSupabaseClient(req);
    const { error } = await supabaseClient.from('portfolio').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Delete project error:', err);
    return res.status(500).json({ error: 'Failed to delete portfolio project' });
  }
});

export default router;
