/**
 * Node loader shim used by the jsdom smoke test (smoke.test.mjs):
 *  - transforms .jsx on the fly with esbuild
 *  - imports .json as ESM
 *  - resolves extensionless relative imports
 */
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { transformSync } from 'esbuild';

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('.') && !/\.[a-z]+$/i.test(specifier)) {
    for (const ext of ['.jsx', '.js', '/index.jsx', '/index.js']) {
      try {
        const url = new URL(specifier + ext, context.parentURL).href;
        await readFile(fileURLToPath(url));
        return { url, shortCircuit: true };
      } catch { /* try next */ }
    }
  }
  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (url.endsWith('.json')) {
    const src = await readFile(new URL(url), 'utf8');
    return { format: 'module', shortCircuit: true, source: `export default ${src};` };
  }
  if (url.endsWith('.jsx')) {
    const src = await readFile(new URL(url), 'utf8');
    const { code } = transformSync(src, { loader: 'jsx', format: 'esm', jsx: 'automatic' });
    return { format: 'module', shortCircuit: true, source: code };
  }
  return nextLoad(url, context);
}
