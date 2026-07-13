import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { _prisma?: PrismaClient };

export const getPrisma = () => {
  if (!globalForPrisma._prisma) {
    globalForPrisma._prisma = new PrismaClient({
      log: ['query'],
    });
  }
  return globalForPrisma._prisma;
};

export const prisma = new Proxy({} as PrismaClient, {
  get: (target, prop) => {
    if (prop === 'then') return undefined;
    const client = getPrisma();
    const value = client[prop as keyof PrismaClient];
    return typeof value === 'function' ? value.bind(client) : value;
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma._prisma = getPrisma();
