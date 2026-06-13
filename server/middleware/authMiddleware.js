import { supabase } from '../supabaseClient.js';

/**
 * Middleware to protect API routes.
 * Validates the JWT Bearer token via Supabase Auth.
 */
export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or malformed authorization token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: error ? error.message : 'Unauthorized: Session invalid or expired' });
    }

    // Attach user profile info to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Auth verification error:', err);
    return res.status(500).json({ error: 'Authentication verification failed' });
  }
}
