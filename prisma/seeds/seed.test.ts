import { PrismaClient } from '../../libs/prisma-client/src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [{ name: 'Test User', email: 'testuser@example.com' }],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
