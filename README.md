# CampanhaOS — Guia de Deploy (5 minutos)

Este é um sistema SaaS multi-tenant para gestão de campanhas políticas, construído com NestJS, Next.js e PostgreSQL (Prisma).

## 🚀 Passo 1: Clonar o Repositório
Abra o terminal e execute:
```bash
git clone https://github.com/seu-usuario/campanhaos.git
cd campanhaos
```

## ☁️ Passo 2: Criar Conta no Railway
1. Acesse: [https://railway.app](https://railway.app)
2. Clique em **"Start a New Project"**
3. Conecte sua conta GitHub
4. Selecione o repositório **"campanhaos"**

## 📦 Passo 3: Criar os Serviços
O Railway vai detectar automaticamente o backend e o frontend se você configurou o monorepo corretamente ou se fez o deploy das pastas separadas. 

**Você precisa adicionar manualmente:**
1. **PostgreSQL**: Clique em `+ New` → `Database` → `PostgreSQL`
2. **Redis**: Clique em `+ New` → `Database` → `Redis`

## ⚙️ Passo 4: Configurar Variáveis de Ambiente

### No painel do Backend (NestJS):
Vá em **"Variables"** e adicione:
- `DATABASE_URL`: (O Railway preenche automaticamente ao conectar o PostgreSQL)
- `REDIS_URL`: (O Railway preenche automaticamente ao conectar o Redis)
- `JWT_SECRET`: `SuaSenhaSecretaAqui123!@#`
- `FRONTEND_URL`: `https://seu-frontend.up.railway.app`

### No painel do Frontend (Next.js):
Adicione:
- `NEXT_PUBLIC_API_URL`: `https://seu-backend.up.railway.app`

## 🚢 Passo 5: Fazer Deploy
1. Clique em **"Deploy"** em cada serviço.
2. O Prisma executará as migrations e o seed automaticamente no primeiro deploy (configurado no `railway.toml`).
3. Aguarde 2-3 minutos.

---

## 🔑 Acessar o Sistema
1. Clique na URL pública do Frontend.
2. Faça login com as credenciais de teste abaixo:

### Credenciais de Teste (Seed)
- **ROOT ADMIN**:
  - CPF: `000.000.000-00` (digite apenas números ou com máscara)
  - Senha: `Admin@123`
- **ADMIN DEMO**:
  - CPF: `111.111.111-11`
  - Senha: `Demo@123`

---

## ✅ Checklist de Verificação
| Item | Status | Observação |
|------|--------|------------|
| Backend compila | ✅ | NestJS Build OK |
| Frontend compila | ✅ | Next.js Build OK |
| Login funciona | ✅ | CPF 000.000.000-00 OK |
| RLS ativo | ✅ | Isolamento de Tenant OK |
| Deploy Railway | ✅ | Configurado via railway.toml |

---

## 🛠️ Estrutura do Projeto
- `backend/`: API NestJS com Prisma ORM.
- `frontend/`: Aplicação Next.js 14 (App Router).
- `prisma/`: Schema do banco de dados e scripts de seed.
