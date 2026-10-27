import { mkdir, writeFile } from 'node:fs/promises';
const endpoint = 'https://mcp.context7.com/mcp';
let id = 0;
async function rpc(method, params = {}) {
  const response = await fetch(endpoint, {
    method: 'POST', signal: AbortSignal.timeout(60000),
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream',
      ...(process.env.CONTEXT7_API_KEY ? { Authorization: `Bearer ${process.env.CONTEXT7_API_KEY}` } : {}) },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++id, method, params })
  });
  if (!response.ok) throw new Error(`Context7 HTTP ${response.status}: ${(await response.text()).slice(0,200)}`);
  const raw = await response.text();
  const result = raw.startsWith('event:') || raw.startsWith('data:')
    ? raw.split('\n').filter(line => line.startsWith('data:')).map(line => JSON.parse(line.slice(5))).find(item => item.id === id)
    : JSON.parse(raw);
  if (!result || result.error || result.result?.isError) throw new Error(JSON.stringify(result));
  return result.result;
}
const initialization = await rpc('initialize', {protocolVersion:'2025-03-26',capabilities:{},clientInfo:{name:'astro-landing-docs-check',version:'1.0.0'}});
const tools = await rpc('tools/list');
console.log('Context7:', initialization.serverInfo.version, tools.tools.map(tool=>tool.name));
const results = {};
for (const libraryName of ['astro','gsap']) {
  results[libraryName] = await rpc('tools/call', {name:'resolve-library-id',arguments:{libraryName,query:libraryName==='astro'?'Astro static GitHub Pages deployment site base imported image TypeScript strict':'GSAP matchMedia ScrollTrigger cleanup reduced motion timeline'}});
}
const docs = {};
for (const [name, libraryId, query] of [
  ['astro','/withastro/docs','Configure static Astro GitHub Pages deployment using site and base, and import.meta.env.BASE_URL for links'],
  ['gsap','/websites/gsap','gsap.matchMedia prefers-reduced-motion and ScrollTrigger timeline cleanup with revert']
]) docs[name] = await rpc('tools/call', {name:'query-docs',arguments:{libraryId,query,language:'TypeScript'}});
await mkdir('docs/research', {recursive:true});
await writeFile('docs/research/context7.json', JSON.stringify({checkedAt:new Date().toISOString(),initialization,tools,results,docs},null,2));
console.log(JSON.stringify(docs,null,2));
