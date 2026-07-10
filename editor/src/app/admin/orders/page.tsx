import React from 'react';
import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';

export const revalidate = 0; // Disable cache

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-semibold text-[#1a1a18]">Orders</h1>
        <p className="text-[#6b6560] mt-1 text-sm">Manage customer photo book orders.</p>
      </div>

      <div className="bg-white rounded-xl border border-[#e8e2d9] shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-[#1a1a18]">
          <thead className="bg-[#faf8f5] text-[#a09890] text-[10px] uppercase tracking-wider font-semibold border-b border-[#e8e2d9]">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8e2d9]">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#6b6560]">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => {
                const project = JSON.parse(order.projectData);
                const pageCount = project.pages?.length || 0;

                return (
                  <tr key={order.id} className="hover:bg-[#faf8f5] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#6b6560]">
                      {order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      {format(new Date(order.createdAt), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.customerName || 'Anonymous'}</div>
                      {order.customerEmail && (
                        <div className="text-xs text-[#6b6560]">{order.customerEmail}</div>
                      )}
                      <div className="text-[10px] text-[#a09890] mt-0.5">{pageCount} pages</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide
                        ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-800' : ''}
                        ${order.status === 'PRINTING' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-xs font-semibold text-[#E85D26] hover:underline">
                        View JSON
                      </button>
                      <button className="text-xs font-semibold text-[#6b6560] hover:underline">
                        Update Status
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
