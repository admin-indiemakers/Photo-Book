'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getUserOrders } from '../actions/orders';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrders() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setError('Please log in to view your orders.');
        setLoading(false);
        return;
      }
      
      const res = await getUserOrders(session.user.id);

      if (!res.success) {
        console.error(res.error);
        setError('Failed to load orders.');
      } else {
        setOrders(res.orders || []);
      }
      setLoading(false);
    }
    loadOrders();
  }, []);

  if (loading) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  if (error) {
    return (
      <div className="min-h-screen pt-32 px-6 flex flex-col items-center justify-center bg-[#F7F5F0]">
        <h1 className="text-3xl font-serif text-[#1a1a18] mb-4">Your Orders</h1>
        <p className="text-[#1a1a18]/60 mb-8">{error}</p>
        <Link href="/login" className="bg-[#1a1a18] text-white px-8 py-3 rounded hover:bg-black transition-colors">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#F7F5F0]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif text-[#1a1a18] mb-12">Your Orders</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-black/5">
            <h2 className="text-xl font-medium text-[#1a1a18] mb-4">No orders yet</h2>
            <p className="text-[#1a1a18]/60 mb-8">You have no orders. Order a product now!</p>
            <Link href="/" className="bg-[#E85D26] text-white px-8 py-3 rounded hover:bg-[#d0501f] transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm border border-black/5">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-black/5">
                  <div>
                    <p className="text-sm text-[#1a1a18]/60 mb-1">Order #{order.id.substring(0, 8)}</p>
                    <p className="font-medium text-[#1a1a18]">{new Date(order.updated_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono tracking-widest uppercase text-[#E85D26] mb-1">{order.status}</p>
                    <p className="font-medium text-[#1a1a18]">₹{order.total_amount}</p>
                  </div>
                </div>
                
                {order.order_items && (
                  <div className="space-y-4 mt-4">
                    {order.order_items.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 items-center">
                        {item.customization?.items?.[0]?.url && (
                          <img 
                            src={item.customization.items[0].url} 
                            alt="Product" 
                            className="w-16 h-16 rounded object-cover border border-black/10"
                          />
                        )}
                        <div>
                          <p className="font-medium text-[#1a1a18]">{item.products?.name || 'Product'}</p>
                          <p className="text-sm text-[#1a1a18]/60">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
