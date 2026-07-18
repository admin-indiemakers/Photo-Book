'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function getUserOrders(userId: string) {
  if (!userId) return { success: false, error: 'Not authenticated' };

  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('customer_id', userId)
      .order('updated_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, orders: data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
