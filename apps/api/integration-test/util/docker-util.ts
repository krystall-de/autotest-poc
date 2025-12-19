import { execSync } from 'child_process';

export const startDockerCompose = (
  projectName: string,
  composeFile: string
) => {
  execSync(`docker-compose -p ${projectName} -f ${composeFile} up -d`, {
    stdio: 'inherit',
  });
};

export const waitForHealthyContainer = (
  containerName: string,
  timeoutSec = 60
) => {
  const start = Date.now();
  while (Date.now() - start < timeoutSec * 1000) {
    const status = execSync(
      `docker inspect --format='{{json .State.Health.Status}}' ${containerName}`,
      { encoding: 'utf-8' }
    ).trim();
    if (status === '"healthy"') return;
    console.log(`Waiting for ${containerName} to be healthy...`);
    execSync('sleep 2');
  }
  throw new Error(`Container ${containerName} did not become healthy in time`);
};

export const stopDockerCompose = (projectName: string, composeFile: string) => {
  execSync(`docker-compose -p ${projectName} -f ${composeFile} down -v`, {
    stdio: 'inherit',
  });
};
