import React from 'react';
import Link from 'next/link';
import { Home, Package, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f4efeb] text-[#1a1a18]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#e8e2d9] flex flex-col">
        <div className="p-6">
          <Link href="/admin" className="font-serif text-2xl font-bold text-[#E85D26] hover:opacity-80 transition-opacity">
            MEMORIZE.
          </Link>
          <p className="text-xs text-[#a09890] mt-1 uppercase tracking-wider font-semibold">Admin Panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#FAF6EE] text-[#6b6560] hover:text-[#E85D26] transition-colors">
            <Home size={18} />
            Dashboard
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#FAF6EE] text-[#6b6560] hover:text-[#E85D26] transition-colors">
            <Package size={18} />
            Orders
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#FAF6EE] text-[#6b6560] hover:text-[#E85D26] transition-colors">
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-[#e8e2d9]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#FAF6EE] text-[#6b6560] hover:text-[#E85D26] transition-colors">
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
