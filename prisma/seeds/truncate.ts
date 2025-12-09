import { PrismaClient } from '../../libs/prisma-client/src/generated/prisma/client';

const prisma = new PrismaClient();

async function truncateAllTables() {
  await prisma.$executeRawUnsafe(`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE`);
}

async function main() {
  await truncateAllTables();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });