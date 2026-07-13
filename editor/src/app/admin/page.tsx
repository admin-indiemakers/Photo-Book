import React from 'react';
import { prisma } from '@/lib/prisma';
import { Package, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const revalidate = 0; // Disable cache

export default async function AdminDashboard() {
  const orders = await prisma.order.findMany();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.status === 'PENDING').length;
  const completedOrders = orders.filter((o: any) => o.status === 'SHIPPED').length;

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
    </div>
  );
}
