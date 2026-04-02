'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface Tenant {
  id: string;
  name: string;
  role: string;
}

export default function SelectTenantPage() {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedTenants = localStorage.getItem('tenants');
    if (storedTenants) {
      setTenants(JSON.parse(storedTenants));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleSelect = async (tenantId: string) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/select-tenant`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ tenantId }),
      });

      if (!response.ok) throw new Error('Erro ao selecionar campanha');

      const data = await response.json();
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('tenant', JSON.stringify(data.tenant));
      
      toast.success(`Campanha "${data.tenant.name}" selecionada!`);
      router.push('/dashboard');
    } catch (error) {
      toast.error('Erro ao selecionar campanha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Selecione a Campanha</h1>
        <p className="text-gray-500 text-center mb-8">Você tem acesso a múltiplas campanhas. Escolha uma para continuar.</p>
        
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <button
              key={tenant.id}
              onClick={() => handleSelect(tenant.id)}
              disabled={loading}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group disabled:opacity-50"
            >
              <div className="text-left">
                <p className="font-semibold text-gray-800 group-hover:text-blue-600">{tenant.name}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{tenant.role}</p>
              </div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-blue-100 transition-colors">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            router.push('/login');
          }}
          className="mt-8 w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          Sair e entrar com outra conta
        </button>
      </div>
    </div>
  );
}
