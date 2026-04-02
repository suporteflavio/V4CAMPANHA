import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seed started...');

  // 1. Root User
  const rootPassword = await bcrypt.hash('Admin@123', 12);
  const rootUser = await prisma.user.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      cpf: '00000000000',
      name: 'Root Admin',
      email: 'root@campanhaos.com',
      passwordHash: rootPassword,
      isRoot: true,
    },
  });
  console.log('Root user created:', rootUser.cpf);

  // 2. Demo Tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { cnpj: '00000000000100' },
    update: {},
    create: {
      cnpj: '00000000000100',
      name: 'Campanha Demo',
      slug: 'campanha-demo',
      plan: 'pro',
    },
  });
  console.log('Demo tenant created:', demoTenant.name);

  // 3. Admin Demo User
  const demoPassword = await bcrypt.hash('Demo@123', 12);
  const demoUser = await prisma.user.upsert({
    where: { cpf: '11111111111' },
    update: {},
    create: {
      cpf: '11111111111',
      name: 'Admin Demo',
      email: 'demo@campanhaos.com',
      passwordHash: demoPassword,
    },
  });
  console.log('Demo user created:', demoUser.cpf);

  // 4. Link Demo User to Demo Tenant
  await prisma.tenantUser.upsert({
    where: {
      tenantId_userId: {
        tenantId: demoTenant.id,
        userId: demoUser.id,
      },
    },
    update: {},
    create: {
      tenantId: demoTenant.id,
      userId: demoUser.id,
      role: 'admin',
    },
  });
  console.log('Demo user linked to demo tenant');

  // 5. Municipalities (Top 10 GO as placeholder)
  const municipalities = [
    { ibgeCode: '5208707', name: 'Goiânia', uf: 'GO' },
    { ibgeCode: '5201108', name: 'Anápolis', uf: 'GO' },
    { ibgeCode: '5201405', name: 'Aparecida de Goiânia', uf: 'GO' },
    { ibgeCode: '5218805', name: 'Rio Verde', uf: 'GO' },
    { ibgeCode: '5212503', name: 'Luziânia', uf: 'GO' },
    { ibgeCode: '5200258', name: 'Águas Lindas de Goiás', uf: 'GO' },
    { ibgeCode: '5221403', name: 'Trindade', uf: 'GO' },
    { ibgeCode: '5211503', name: 'Itumbiara', uf: 'GO' },
    { ibgeCode: '5211909', name: 'Jataí', uf: 'GO' },
    { ibgeCode: '5208004', name: 'Formosa', uf: 'GO' },
  ];

  for (const m of municipalities) {
    await prisma.municipality.upsert({
      where: { ibgeCode: m.ibgeCode },
      update: {},
      create: m,
    });
  }
  console.log('Top GO municipalities seeded');

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
