#!/usr/bin/env node
import { readFileSync } from 'node:fs';

// B1: fixed release for GHSA-m99w-x7hq-7vfj / CVE-2026-64641.
const expected = '16.2.11';
const root = new URL('../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const installed = process.argv.slice(2).includes('--installed');
let failures = 0;

function check(label, actual) {
  const ok = actual === expected;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}: ${actual ?? '(missing)'}; expected ${expected}`);
  if (!ok) failures += 1;
}

try {
  if (process.argv.slice(2).some((arg) => arg !== '--installed')) {
    throw new Error('Usage: node scripts/check-next-security.mjs [--installed]');
  }
  const manifest = readJson('package.json');
  const lock = readJson('package-lock.json');
  for (const [name, section] of [['next', 'dependencies'], ['eslint-config-next', 'devDependencies']]) {
    check(`manifest ${name}`, manifest[section]?.[name]);
    check(`lock root ${name}`, lock.packages?.['']?.[section]?.[name]);
    check(`lock package ${name}`, lock.packages?.[`node_modules/${name}`]?.version);
    if (installed) check(`installed ${name}`, readJson(`node_modules/${name}/package.json`).version);
  }
} catch (error) {
  console.error(`FAIL security gate: ${error.message}`);
  failures += 1;
}
process.exitCode = failures ? 1 : 0;
