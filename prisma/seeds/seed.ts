import { existsSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const env = (process.env.ENV || "local").toLowerCase();
const envSeed = join(__dirname, `seed.${env}.ts`);
const commonSeed = join(__dirname, `seed.common.ts`);

let ranAny = false;

if (existsSync(commonSeed)) {
  const result = spawnSync("tsx", [commonSeed], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
  ranAny = true;
}

if (existsSync(envSeed)) {
  const result = spawnSync("tsx", [envSeed], { stdio: "inherit" });
  process.exit(result.status ?? 0);
} else {
  if (!ranAny) {
    console.log(`No seed file found for env "${env}" or common. Skipping seeding.`);
  }
  process.exit(0);
}