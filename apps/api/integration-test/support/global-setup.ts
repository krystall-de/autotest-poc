/* eslint-disable */
import { config } from './config';
import {
  startDockerCompose,
  waitForHealthyContainer,
} from '../util/docker-util';
import { setupDatabase } from '../util/database-util';

// Hint: Use `globalThis` to pass variables to global teardown.
// declare global {}

module.exports = async function () {
  console.log('\nSetting up environment...\n');

  // Start services that the app needs to run using docker-compose
  console.log('Starting service containers...\n');
  startDockerCompose(config.dockerProjectName, config.dockerComposeFile);

  // Wait for service containers to be ready
  console.log('Waiting for service containers to be healthy...\n');
  waitForHealthyContainer(`${config.dockerProjectName}-dummy-1`);

  // Prepare database
  console.log('Setting up database...\n');
  setupDatabase();
};
