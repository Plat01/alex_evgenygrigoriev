import { mkdir, writeFile } from 'node:fs/promises';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({headless:true});
const base = process.env.CHECK_URL || 'http://localhost:4321/alex_evgenygrigoriev/';
const output = 'docs/research/verification';
await mkdir(output,{recursive:true});
const report = {url:base,checks:[],errors:[]};
for (const [width,height] of [[390,844],[1366,768],[1440,900],[1920,1080],[2560,1440]]) {
 const page = await browser.newPage({viewport:{width,height}});
 page.on('pageerror',error=>report.errors.push(String(error)));
 page.on('console',message=>{if(message.type()==='error') report.errors.push(message.text());});
 page.on('response',response=>{if(response.status()>=400) report.errors.push(`${response.status()} ${response.url()}`);});
 await page.goto(base,{waitUntil:'networkidle'});
 await page.waitForTimeout(1400);
 await page.screenshot({path:`${output}/${width}-start.png`});
 const frames=[];
 for (const selector of ['#directions','#experience','#approach','.person','#meeting']) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  await page.waitForTimeout(750);
  frames.push(await page.evaluate(()=>({scroll:scrollY,overflow:document.documentElement.scrollWidth>innerWidth})));
  if(['#approach','#meeting'].includes(selector)) await page.screenshot({path:`${output}/${width}-${selector.slice(1)}.png`});
 }
 await page.screenshot({path:`${output}/${width}-full.png`,fullPage:true});
 const state=await page.evaluate(()=>({
  overflow:document.documentElement.scrollWidth>innerWidth,
  headings:[...document.querySelectorAll('h1,h2')].map(e=>({text:e.textContent,visible:getComputedStyle(e).visibility==='visible',opacity:getComputedStyle(e).opacity})),
  images:[...document.images].map(e=>({src:e.currentSrc,loaded:e.complete&&e.naturalWidth>0})),
  cta:[...document.querySelectorAll('.button')].map(e=>e.getAttribute('href')),
  anchors:[...document.querySelectorAll('a[href^="#"]')].every(e=>document.querySelector(e.getAttribute('href'))),
  fonts:document.fonts.check('500 32px "Manrope Variable"'),
  canonical:document.querySelector('[rel=canonical]')?.getAttribute('href')
 }));
 await page.locator('.topic summary').nth(1).click();
 const details=await page.locator('.topic').nth(1).getAttribute('open')!==null;
 await page.goto(base);await page.keyboard.press('Tab');
 const keyboard=await page.locator(':focus').textContent();
 report.checks.push({width,height,...state,frames,details,keyboard});
 if(width===1440) {
  await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'networkidle'});
  report.reducedMotion=await page.evaluate(()=>({active:matchMedia('(prefers-reduced-motion: reduce)').matches,pins:document.querySelectorAll('.pin-spacer').length,overflow:document.documentElement.scrollWidth>innerWidth}));
  await page.screenshot({path:`${output}/reduced-motion.png`,fullPage:true});
  await page.setViewportSize({width:390,height:844});
  report.resized=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,pins:document.querySelectorAll('.pin-spacer').length}));
 }
 await page.close();
}
const noJS=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
const plain=await noJS.newPage();await plain.goto(base,{waitUntil:'networkidle'});
await plain.locator('#meeting').scrollIntoViewIfNeeded();
report.noJavaScript=await plain.evaluate(()=>({sections:document.querySelectorAll('main section').length,overflow:document.documentElement.scrollWidth>innerWidth,cta:[...document.querySelectorAll('.button')].every(e=>e.getAttribute('href')==='https://t.me/GrigorievEvgene')}));
await plain.locator('.topic summary').nth(2).click();report.noJavaScript.details=await plain.locator('.topic').nth(2).getAttribute('open')!==null;
await plain.screenshot({path:`${output}/no-js.png`,fullPage:true}).catch(()=>{});
await noJS.close();
await writeFile(`${output}/report.json`,JSON.stringify(report,null,2));
await browser.close();
console.log(JSON.stringify(report,null,2));
if(report.errors.length || report.checks.some(c=>c.overflow||c.images.some(i=>!i.loaded)||!c.anchors||!c.details) || report.noJavaScript.overflow) process.exitCode=1;
