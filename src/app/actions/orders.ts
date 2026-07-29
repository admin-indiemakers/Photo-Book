'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function getUserOrders(userId: string, email?: string) {
  if (!userId) return { success: false, error: 'Not authenticated' };

  try {
    let query = supabaseAdmin
      .from('customers')
      .select('id');
      
    if (email) {
      query = query.or(`auth_user_id.eq.${userId},email.eq.${email}`);
    } else {
      query = query.eq('auth_user_id', userId);
    }

    const { data: customers } = await query;
    const customer = customers && customers.length > 0 ? customers[0] : null;

    if (!customer) {
      return { success: true, orders: [] }; // No customer record means no orders
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*, order_items(*, products(*))')
      .eq('customer_id', customer.id)
      .order('updated_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, orders: data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getUserNotifications(userId: string, email?: string) {
  if (!userId) return { success: false, error: 'Not authenticated' };
  try {
    let query = supabaseAdmin.from('customers').select('id, notes');
    if (email) {
      query = query.or(`auth_user_id.eq.${userId},email.eq.${email}`);
    } else {
      query = query.eq('auth_user_id', userId);
    }
    const { data: customers } = await query;
    const customer = customers && customers.length > 0 ? customers[0] : null;
    if (!customer || !customer.notes) return { success: true, notifications: [] };
    
    let notifications = [];
    try {
      notifications = JSON.parse(customer.notes);
    } catch(e) {}
    
    return { success: true, notifications: Array.isArray(notifications) ? notifications : [] };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function markNotificationsRead(userId: string, email?: string) {
  if (!userId) return { success: false };
  try {
    let query = supabaseAdmin.from('customers').select('id, notes');
    if (email) query = query.or(`auth_user_id.eq.${userId},email.eq.${email}`);
    else query = query.eq('auth_user_id', userId);
    
    const { data: customers } = await query;
    const customer = customers && customers.length > 0 ? customers[0] : null;
    if (!customer || !customer.notes) return { success: true };
    
    let notifications = [];
    try {
      notifications = JSON.parse(customer.notes);
      notifications = notifications.map((n: any) => ({ ...n, is_read: true }));
      await supabaseAdmin.from('customers').update({ notes: JSON.stringify(notifications) }).eq('id', customer.id);
    } catch(e) {}
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
