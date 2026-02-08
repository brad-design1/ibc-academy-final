import { writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://ibcacademy.org';
const IMAGES_DIR = join(__dirname, '..', 'public', 'images');
const OUTPUT_FILE = join(__dirname, '..', 'public', 'image-sitemap.xml');

function generateImageSitemap() {
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  const images = [];
  
  try {
    const files = readdirSync(IMAGES_DIR);
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const filePath = join(IMAGES_DIR, file);
        const stats = statSync(filePath);
        
        // Skip small images (likely icons) - focus on content images
        if (stats.size > 10000) { // 10KB minimum
          images.push({
            url: `${SITE_URL}/images/${file}`,
            lastmod: stats.mtime.toISOString(),
            title: file.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '').replace(/-/g, ' '),
            caption: getImageCaption(file)
          });
        }
      }
    }
    
    const sitemap = generateXML(images);
    writeFileSync(OUTPUT_FILE, sitemap, 'utf-8');
    console.log(`Image sitemap generated with ${images.length} images: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Error generating image sitemap:', error);
  }
}

function getImageCaption(filename) {
  // Create meaningful captions based on filename
  const name = filename.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
  
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
    'byob-cover': 'Becoming Your Own Banker book cover'
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
    const filename = image.url.split('/').pop().replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, '');
    
    // Try to map images to their corresponding article pages
    let pageUrl = SITE_URL;
    
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
    } else if (filename.includes('byob') || filename === 'nelson-nash-byob') {
      pageUrl = `${SITE_URL}/book`;
    } else {
      // For standalone educational images, associate with articles index
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