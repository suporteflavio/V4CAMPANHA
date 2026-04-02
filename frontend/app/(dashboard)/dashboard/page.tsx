'use client';

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [tenant, setTenant] = useState<any>(null);

  useEffect(() => {
    const storedTenant = localStorage.getItem('tenant');
    if (storedTenant) {
      setTenant(JSON.parse(storedTenant));
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total de Contatos</p>
          <h3 className="text-3xl font-bold text-gray-900">1.248</h3>
          <div className="mt-2 flex items-center text-green-600 text-sm font-semibold">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+12% este mês</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Arrecadação</p>
          <h3 className="text-3xl font-bold text-gray-900">R$ 45.200</h3>
          <div className="mt-2 flex items-center text-blue-600 text-sm font-semibold">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Meta: 65% atingida</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Check-ins Hoje</p>
          <h3 className="text-3xl font-bold text-gray-900">42</h3>
          <div className="mt-2 flex items-center text-purple-600 text-sm font-semibold">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Equipe em campo</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo ao CampanhaOS!</h2>
        <p className="text-gray-500 max-w-md">
          Você está logado na campanha <span className="font-bold text-blue-600">"{tenant?.name || '...'}"</span>. 
          Utilize o menu lateral para gerenciar seus contatos, finanças e equipe.
        </p>
      </div>
    </div>
  );
}
