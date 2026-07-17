'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function syncCustomerData(id: string, email: string, name: string) {
  try {
    const { error } = await supabaseAdmin.from('customers').upsert({
      id,
      email,
      full_name: name || email.split('@')[0],
    });
    if (error) {
      console.error('Error syncing customer data:', error);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err: any) {
    console.error('Exception syncing customer data:', err);
    return { success: false, error: err.message };
  }
}

export async function adminCreateUser(email: string, password: string, name: string) {
  try {
    // This bypasses the 2 emails/hour rate limit on the free tier
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: name }
    });
    
    if (error) return { success: false, error: error.message };
    
    if (data?.user) {
      await syncCustomerData(data.user.id, email, name);
      return { success: true, user: data.user };
    }
    return { success: false, error: 'Unknown error creating user' };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
