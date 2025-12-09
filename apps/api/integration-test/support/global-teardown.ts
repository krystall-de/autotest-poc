/* eslint-disable */

import { execSync } from "child_process";
import { config } from "./config";

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // await killPort(port);

  console.log('\nTearing down...\n');
  
  if (globalThis.__APP__) {
    await globalThis.__APP__.close();
  }

  // Stop services started in global setup
  execSync(`docker-compose -p ${config.dockerProjectName} -f ${config.dockerComposeFile} down -v`, { stdio: 'inherit' });
};
