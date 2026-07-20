import React from 'react';
import { prisma } from '@/lib/prisma';
import { Package, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 0; // Disable cache

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length;
  const completedOrders = orders.filter((o: any) => o.status === 'SHIPPED').length;

  const { data: usersData, error } = await supabaseAdmin.auth.admin.listUsers();
  const users = usersData?.users || [];

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-[#1a1a18]">Dashboard Overview</h1>
        <p className="text-[#6b6560] mt-1">Welcome to the Memorize Admin Panel.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-[#e8e2d9] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Package size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#6b6560] uppercase tracking-wider">Total Orders</p>
            <p className="text-3xl font-semibold text-[#1a1a18]">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#e8e2d9] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
            <Clock size={24} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#6b6560] uppercase tracking-wider">Pending</p>
            <p className="text-3xl font-semibold text-[#1a1a18]">{pendingOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-[#e8e2d9] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#6b6560] uppercase tracking-wider">Shipped</p>
            <p className="text-3xl font-semibold text-[#1a1a18]">{completedOrders}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl border border-[#e8e2d9] shadow-sm">
        <h2 className="text-lg font-semibold text-[#1a1a18] mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link href="/admin/orders">
            <Button className="bg-[#E85D26] hover:bg-[#D4520A] text-white">
              View All Orders
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-[#e8e2d9] hover:bg-[#FAF6EE] text-[#6b6560]">
              Open Editor
            </Button>
          </Link>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-white p-6 rounded-xl border border-[#e8e2d9] shadow-sm">
        <h2 className="text-lg font-semibold text-[#1a1a18] mb-4">Recent Users ({users.length})</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[#6b6560]">
            <thead className="border-b border-[#e8e2d9] text-[#1a1a18] uppercase tracking-wider bg-gray-50/50">
              <tr>
                <th className="py-3 px-4 font-medium">Name</th>
                <th className="py-3 px-4 font-medium">Email</th>
                <th className="py-3 px-4 font-medium">Joined At</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.slice(0, 10).map((u) => (
                  <tr key={u.id} className="border-b border-[#e8e2d9] hover:bg-[#FAF6EE]/30 transition-colors">
                    <td className="py-3 px-4 text-[#1a1a18]">{u.user_metadata?.full_name || 'N/A'}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">
                      {new Date(u.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-[#6b6560]">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
