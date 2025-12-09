import { existsSync } from "fs";
import { join } from "path";
import { spawnSync } from "child_process";

const env = (process.env.ENV || "LOCAL").toLowerCase();
const envSeed = join(__dirname, `seed.${env}.ts`);
const commonSeed = join(__dirname, `seed.common.ts`);
const shouldTruncate = process.argv.includes("--truncate");
const truncateScript = join(__dirname, "truncate.ts");

if (shouldTruncate && existsSync(truncateScript)) {
  console.log("Truncating database...");
  const result = spawnSync("tsx", [truncateScript], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

let ranAny = false;

if (existsSync(commonSeed)) {
  console.log(`Seeding common data...`);
  const result = spawnSync("tsx", [commonSeed], { stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status ?? 1);
  ranAny = true;
}

if (existsSync(envSeed)) {
  console.log(`Seeding data for env "${env}"...`);
  const result = spawnSync("tsx", [envSeed], { stdio: "inherit" });
  process.exit(result.status ?? 0);
} else {
  if (!ranAny) {
    console.log(`No seed file found for env "${env}" or common. Skipping seeding.`);
  }
  process.exit(0);
}