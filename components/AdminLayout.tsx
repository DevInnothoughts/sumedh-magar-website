'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Star,
  Users,
  FolderOpen,
  Image,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { signOut } from '@/lib/auth';
import { Button } from './Button';

type NavItem = {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/contacts', label: 'Contacts', icon: Users },
  { path: '/admin/posts', label: 'Posts', icon: FileText },
  { path: '/admin/comments', label: 'Comments', icon: MessageSquare },
  { path: '/admin/google-reviews', label: 'Google Reviews', icon: Star },
  { path: '/admin/media', label: 'Media Library', icon: FolderOpen },
  { path: '/admin/gallery', label: 'Gallery Manager', icon: Image },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Logged out successfully');
      router.push('/admin');
    } catch {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow-soft fixed top-0 left-0 right-0 z-40">
        <div className="px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <h1 className="text-xl md:text-2xl font-heading font-bold text-secondary">Admin Panel</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex pt-20">
        <aside
          className={`fixed left-0 top-20 bottom-0 w-64 bg-white shadow-soft transition-transform duration-300 z-30 overflow-y-auto ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-secondary text-white shadow-soft'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};
