'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [tenant, setTenant] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTenant = localStorage.getItem('tenant');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    toast.info('Sessão encerrada.');
    router.push('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-blue-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-blue-800">
          <h2 className="text-xl font-bold tracking-tight">CampanhaOS</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a href="/dashboard" className="flex items-center space-x-3 p-3 bg-blue-800 rounded-lg transition-colors">
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg transition-all">
            <span className="font-medium">Contatos</span>
          </a>
          <a href="#" className="flex items-center space-x-3 p-3 text-blue-200 hover:bg-blue-800 hover:text-white rounded-lg transition-all">
            <span className="font-medium">Financeiro</span>
          </a>
        </nav>
        <div className="p-4 border-t border-blue-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-3 text-red-300 hover:bg-red-900 hover:text-white rounded-lg transition-all">
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
            {tenant && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {tenant.name}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.cpf}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>
        <div className="p-8 overflow-auto">{children}</div>
      </main>
    </div>
  );
}