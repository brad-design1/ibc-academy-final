import { writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://ibcacademy.org';
const PUBLIC_DIR = join(__dirname, '..', 'public');
const OUTPUT_FILE = join(__dirname, '..', 'public', 'image-sitemap.xml');

function generateImageSitemap() {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  const images = [];
  
  try {
    // Scan all subdirectories in public folder
    scanDirectory(PUBLIC_DIR, '', images, imageExtensions);
    
    const sitemap = generateXML(images);
    writeFileSync(OUTPUT_FILE, sitemap, 'utf-8');
    console.log(`Image sitemap generated with ${images.length} images: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error generating image sitemap:', error);
  }
}

function scanDirectory(dirPath, relativePath, images, imageExtensions) {
  const files = readdirSync(dirPath);
  
  for (const file of files) {
    const fullPath = join(dirPath, file);
    const stats = statSync(fullPath);
    
    if (stats.isDirectory()) {
      // Recursively scan subdirectories
      const newRelativePath = relativePath ? `${relativePath}/${file}` : file;
      scanDirectory(fullPath, newRelativePath, images, imageExtensions);
    } else {
      const ext = extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        // Skip small images (likely icons) and focus on content images
        if (stats.size > 5000) { // 5KB minimum to include more images
          const imageUrl = relativePath ? 
            `${SITE_URL}/${relativePath}/${file}` : 
            `${SITE_URL}/${file}`;
          
          images.push({
            url: imageUrl,
            lastmod: stats.mtime.toISOString(),
            title: file.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '').replace(/-/g, ' '),
            caption: getImageCaption(file, relativePath)
          });
        }
      }
    }
  }
}

function getImageCaption(filename, relativePath) {
  // Create meaningful captions based on filename and directory
  const name = filename.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
  
  // Special handling for different directories
  if (relativePath === 'og') {
    return `${name.replace(/-/g, ' ')} - Educational infographic about Infinite Banking Concept`;
  } else if (relativePath === 'images/masters') {
    return `Portrait of ${name.replace(/-/g, ' ')} - Austrian Economics and Banking Philosophy`;
  }
  
  const captions = {
    'banking-vs-investing': 'Banking vs Investing comparison infographic',
    'cash-value-growth': 'Cash value growth illustration',
    'dividends-explained': 'How policy dividends work',
    'how-policy-loans-work': 'Policy loan mechanics explained',
    'ibc-vs-401k': 'IBC vs 401k comparison chart',
    'nelson-nash-byob': 'Nelson Nash Becoming Your Own Banker book cover',
    'paid-up-additions': 'Paid-up additions rider explanation',
    'the-banking-function': 'The banking function concept diagram',
    'whole-life-vs-term': 'Whole life vs term life insurance comparison',
    'why-whole-life': 'Why whole life insurance for IBC',
    'family-four-ibc-case-study': 'Family of four IBC case study',
    'byob-cover': 'Becoming Your Own Banker book cover',
    'brad-raschke': 'Brad Raschke - IBC Academy founder and instructor'
  };
  
  return captions[name] || `${name.replace(/-/g, ' ')} - IBC Academy educational content`;
}

function generateXML(images) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  // Group images by related pages
  const pageGroups = groupImagesByPage(images);
  
  for (const [pageUrl, pageImages] of pageGroups) {
    xml += `  <url>\n`;
    xml += `    <loc>${pageUrl}</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
    
    for (const image of pageImages) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${image.url}</image:loc>\n`;
      xml += `      <image:title><![CDATA[${image.title}]]></image:title>\n`;
      xml += `      <image:caption><![CDATA[${image.caption}]]></image:caption>\n`;
      xml += `    </image:image>\n`;
    }
    
    xml += `  </url>\n`;
  }
  
  xml += '</urlset>';
  return xml;
}

function groupImagesByPage(images) {
  const groups = new Map();
  
  for (const image of images) {
    const urlParts = image.url.split('/');
    const filename = urlParts.pop().replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
    const directory = urlParts[urlParts.length - 1]; // Last directory in URL
    
    // Try to map images to their corresponding article pages
    let pageUrl = SITE_URL;
    
    if (directory === 'og') {
      // OpenGraph images - map to specific article pages
      if (filename.includes('business-')) {
        pageUrl = `${SITE_URL}/paths/business-owner`;
      } else if (filename.includes('deeper-')) {
        pageUrl = `${SITE_URL}/paths/deeper-understanding`;
      } else if (filename.includes('freedom-')) {
        pageUrl = `${SITE_URL}/paths/freedom-seeker`;
      } else if (filename.includes('just-curious-')) {
        pageUrl = `${SITE_URL}/paths/just-curious`;
      } else if (filename.includes('parent-')) {
        pageUrl = `${SITE_URL}/paths/parent`;
      } else if (filename.includes('professional-')) {
        pageUrl = `${SITE_URL}/paths/professional`;
      } else if (filename.includes('prove-it-')) {
        pageUrl = `${SITE_URL}/paths/skeptic`;
      } else if (filename.includes('real-estate-')) {
        pageUrl = `${SITE_URL}/paths/real-estate`;
      } else {
        // Individual educational articles
        pageUrl = `${SITE_URL}/learn/articles/${filename}`;
      }
    } else if (directory === 'masters') {
      // Austrian economics masters - associate with about page
      pageUrl = `${SITE_URL}/about`;
    } else if (filename.includes('byob') || filename === 'nelson-nash-byob') {
      pageUrl = `${SITE_URL}/book`;
    } else if (filename === 'brad-raschke') {
      pageUrl = `${SITE_URL}/about`;
    } else {
      // For other images, associate with main pages
      pageUrl = `${SITE_URL}/learn/articles`;
    }
    
    if (!groups.has(pageUrl)) {
      groups.set(pageUrl, []);
    }
    groups.get(pageUrl).push(image);
  }
  
  return groups;
}

// Run the script
generateImageSitemap();