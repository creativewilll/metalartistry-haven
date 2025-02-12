#!/usr/bin/env node
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

// Parse command-line arguments
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 --url [string] [--output report.json]')
  .demandOption(['url'])
  .alias('u', 'url')
  .alias('o', 'output')
  .describe('url', 'The URL (public or localhost) to run the Lighthouse audit on')
  .describe('output', 'Output file for saving the full JSON report (optional)')
  .argv;

(async () => {
  console.log(`Launching Chrome Headless for URL: ${argv.url}`);
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { port: chrome.port, output: 'json' };

  console.log(`Running Lighthouse audit on: ${argv.url} ...`);
  const runnerResult = await lighthouse(argv.url, options);

  const reportJson = runnerResult.report;
  const lhr = runnerResult.lhr;

  // Output summary of key Lighthouse scores
  console.log(`\nLighthouse Summary Report for ${argv.url}:`);
  console.log(`Performance: ${lhr.categories.performance.score * 100}`);
  console.log(`Accessibility: ${lhr.categories.accessibility.score * 100}`);
  console.log(`Best Practices: ${lhr.categories['best-practices'].score * 100}`);
  console.log(`SEO: ${lhr.categories.seo.score * 100}\n`);

  // Optionally write the full report to disk if --output is provided
  if (argv.output) {
    fs.writeFileSync(argv.output, reportJson);
    console.log(`Full Lighthouse report saved to: ${argv.output}`);
  }

  await chrome.kill();
})(); 