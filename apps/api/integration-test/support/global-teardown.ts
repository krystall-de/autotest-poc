/* eslint-disable */
import { config } from './config';
import { stopDockerCompose } from '../util/docker-util';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // await killPort(port);

  console.log('\nTearing down environment...\n');

  // Stop services started in global setup
  stopDockerCompose(config.dockerProjectName, config.dockerComposeFile);
};
