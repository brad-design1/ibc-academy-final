#!/usr/bin/env node

/**
 * IBC Academy — Internal Link Checker
 * 
 * Crawls the built site (dist/) and reports broken internal links.
 * Run: npm run check-links (or: node scripts/check-links.js)
 * 
 * Built by Mabel, Jan 28 2026 (Nightly Build #1)
 */

import { readdir, readFile, stat } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, '..', 'dist');

// Collect all HTML files recursively
async function getAllHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Extract internal links from HTML
function extractInternalLinks(html, filePath) {
  const links = [];
  // Match href="..." attributes
  const hrefRegex = /href="(\/[^"#?]*)/g;
  let match;
  let lineNum = 0;
  const lines = html.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    while ((match = hrefRegex.exec(line)) !== null) {
      links.push({
        href: match[1],
        source: filePath,
        line: i + 1,
      });
    }
  }
  return links;
}

// Check if a path exists in dist
async function pathExists(href) {
  // Normalize: /about → /about/index.html or /about.html
  const candidates = [
    join(DIST_DIR, href, 'index.html'),
    join(DIST_DIR, href + '.html'),
    join(DIST_DIR, href),
  ];
  
  for (const candidate of candidates) {
    try {
      const s = await stat(candidate);
      if (s.isFile()) return true;
    } catch {
      // doesn't exist
    }
  }
  return false;
}

// Get the site-relative path for display
function siteRelative(filePath) {
  return filePath.replace(DIST_DIR, '').replace(/\\/g, '/').replace('/index.html', '/');
}

async function main() {
  console.log('\n🔗 IBC Academy Link Checker\n');
  console.log(`Scanning: ${DIST_DIR}\n`);

  // Check dist exists
  try {
    await stat(DIST_DIR);
  } catch {
    console.error('❌ dist/ directory not found. Run "npm run build" first.\n');
    process.exit(1);
  }

  const htmlFiles = await getAllHtmlFiles(DIST_DIR);
  console.log(`Found ${htmlFiles.length} HTML files\n`);

  const allLinks = [];
  const broken = [];
  const checked = new Set();

  for (const file of htmlFiles) {
    const html = await readFile(file, 'utf-8');
    const links = extractInternalLinks(html, file);
    allLinks.push(...links);
  }

  // Deduplicate by href for checking
  const uniqueHrefs = [...new Set(allLinks.map(l => l.href))];
  
  for (const href of uniqueHrefs) {
    const exists = await pathExists(href);
    if (!exists) {
      const sources = allLinks.filter(l => l.href === href);
      broken.push({ href, sources });
    }
  }

  // Report
  console.log(`Checked ${uniqueHrefs.length} unique internal links\n`);

  if (broken.length === 0) {
    console.log('✅ All internal links are valid!\n');
  } else {
    console.log(`❌ Found ${broken.length} broken link(s):\n`);
    for (const { href, sources } of broken) {
      console.log(`  🔴 ${href}`);
      for (const s of sources) {
        console.log(`     ← ${siteRelative(s.source)} (line ${s.line})`);
      }
      console.log('');
    }
    
    // Summary
    console.log('─'.repeat(50));
    console.log(`\n📊 Summary: ${broken.length} broken / ${uniqueHrefs.length} total links`);
    console.log(`   Pages with broken links: ${new Set(broken.flatMap(b => b.sources.map(s => s.source))).size}`);
    console.log('');
    
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
