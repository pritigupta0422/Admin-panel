import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL ERROR: SUPABASE_URL or SUPABASE_ANON_KEY environment variables are missing.');
}

// Base client using anon key
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns a client instance with the user's Authorization Bearer token forwarded.
 * This ensures queries execute under the user's RLS permissions context.
 */
export function getSupabaseClient(req) {
  const authHeader = req ? req.headers.authorization : null;
  
  if (authHeader) {
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    });
  }
  
  return supabase;
}

/**
 * Returns a client instance initialized with the service role key.
 * Used for administrative bypass queries if needed, though most routes use standard user context.
 */
export function getAdminSupabaseClient() {
  if (!supabaseServiceRoleKey) {
    console.warn('Warning: SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to anon key.');
    return supabase;
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
