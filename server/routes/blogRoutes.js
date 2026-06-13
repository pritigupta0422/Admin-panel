import express from 'express';
import { getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply requireAuth to all endpoints in this file
router.use(requireAuth);

// GET /api/blog -> Retrieve blog posts, optionally filtering by status
router.get('/', async (req, res) => {
  const status = req.query.status || '';
  const search = req.query.q || '';

  try {
    const client = getSupabaseClient(req);
    let query = client.from('blog_posts').select('*');

    // Filter by status if valid
    if (status) {
      query = query.eq('status', status.toLowerCase());
    }

    // Text search filter
    if (search) {
      query = query.or(`title.ilike.%${search}%,author.ilike.%${search}%,category.ilike.%${search}%`);
    }

    // Sort by created_at descending
    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Fetch blogs error:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
});

// POST /api/blog -> Create blog post
router.post('/', async (req, res) => {
  const { title, author, category, content, status } = req.body;

  if (!title || !author || !category) {
    return res.status(400).json({ error: 'Title, author, and category are required fields' });
  }

  const postStatus = status || 'draft';
  const publishedAt = postStatus === 'published' ? new Date().toISOString() : null;

  try {
    const client = getSupabaseClient(req);
    const { data, error } = await client
      .from('blog_posts')
      .insert([
        {
          title,
          author,
          category,
          content,
          status: postStatus,
          published_at: publishedAt,
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json(data);
  } catch (err) {
    console.error('Create blog error:', err);
    return res.status(500).json({ error: 'Failed to create blog post' });
  }
});

// PUT /api/blog/:id -> Edit blog post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, author, category, content, status } = req.body;

  try {
    const client = getSupabaseClient(req);
    
    // First, let's fetch the existing post to check its published state if we are switching to published
    let updateData = {
      title,
      author,
      category,
      content,
      status,
    };

    if (status === 'published') {
      updateData.published_at = new Date().toISOString();
    } else if (status === 'draft' || status === 'pending') {
      updateData.published_at = null;
    }

    const { data, error } = await client
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json(data);
  } catch (err) {
    console.error('Update blog error:', err);
    return res.status(500).json({ error: 'Failed to update blog post' });
  }
});

// DELETE /api/blog/:id -> Delete blog post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const client = getSupabaseClient(req);
    const { error } = await client.from('blog_posts').delete().eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Delete blog error:', err);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router;
