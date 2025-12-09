import { execSync } from 'child_process';

export const setupDatabase = () => {
  execSync(`yarn prisma migrate deploy`, { stdio: 'inherit' });
};

export const resetDatabase = () => {
  execSync(`yarn prisma db seed -- --truncate`, { stdio: 'inherit' });
};
