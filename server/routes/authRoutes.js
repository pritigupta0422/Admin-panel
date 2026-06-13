import express from 'express';
import { supabase, getSupabaseClient } from '../supabaseClient.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/login -> Sign in with email and password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({
      user: data.user,
      session: data.session,
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Failed to process login request' });
  }
});

// POST /api/auth/logout -> Sign out current session
router.post('/logout', requireAuth, async (req, res) => {
  try {
    const client = getSupabaseClient(req);
    const { error } = await client.auth.signOut();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Logout error:', err);
    return res.status(500).json({ error: 'Failed to process logout request' });
  }
});

// GET /api/auth/me -> Return current user details
router.get('/me', requireAuth, (req, res) => {
  return res.json({ user: req.user });
});

export default router;
