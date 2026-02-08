import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Project paths
const projectRoot = join(__dirname, '..');
const articlesDir = join(projectRoot, 'src', 'content', 'articles');
const ogDir = join(projectRoot, 'public', 'og');

// Ensure OG directory exists
if (!existsSync(ogDir)) {
  mkdirSync(ogDir, { recursive: true });
}

// Helper function to parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n(.*?)\n---\s*\n/s;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  const frontmatter = {};
  const lines = match[1].split('\n');
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      let value = valueParts.join(':').trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      frontmatter[key.trim()] = value;
    }
  }
  
  return frontmatter;
}

// Generate OG image using Satori
async function generateOGImage(title, category = '') {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, "Helvetica Neue", sans-serif',
          position: 'relative',
        },
        children: [
          // Background Pattern
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 25% 25%, rgba(201, 168, 76, 0.1) 0%, transparent 50%)',
              },
            },
          },
          // IBC Academy Branding
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 60,
                left: 80,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      background: '#C9A84C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 24,
                      color: '#0f172a',
                    },
                    children: 'IBC',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#C9A84C',
                    },
                    children: 'Academy',
                  },
                },
              ],
            },
          },
          // Category Badge
          category ? {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 60,
                right: 80,
                background: 'rgba(201, 168, 76, 0.2)',
                border: '1px solid rgba(201, 168, 76, 0.3)',
                borderRadius: 8,
                padding: '8px 20px',
                fontSize: 16,
                fontWeight: 600,
                color: '#C9A84C',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },
              children: category,
            },
          } : null,
          // Main Content
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 80px',
                maxWidth: '1040px',
              },
              children: {
                type: 'h1',
                props: {
                  style: {
                    fontSize: title.length > 60 ? 56 : title.length > 40 ? 64 : 72,
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    margin: 0,
                    textAlign: 'center',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                  },
                  children: title,
                },
              },
            },
          },
          // Bottom Accent Line
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 8,
                background: 'linear-gradient(90deg, #C9A84C 0%, rgba(201, 168, 76, 0.3) 100%)',
              },
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: readFileSync(join(projectRoot, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-400-normal.woff')),
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: readFileSync(join(projectRoot, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-700-normal.woff')),
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: readFileSync(join(projectRoot, 'node_modules', '@fontsource', 'inter', 'files', 'inter-latin-800-normal.woff')),
          weight: 800,
          style: 'normal',
        },
      ],
    }
  );

  // Convert SVG to PNG using Sharp
  const pngBuffer = await sharp(Buffer.from(svg))
    .png()
    .toBuffer();
  
  return pngBuffer;
}

// Main execution
async function main() {
  try {
    console.log('🎨 Starting OG image generation...');
    
    // Get all article files
    const articleFiles = readdirSync(articlesDir).filter(file => file.endsWith('.md'));
    console.log(`📄 Found ${articleFiles.length} articles to process`);
    
    let generatedCount = 0;
    const sampleOutputs = [];
    
    for (const file of articleFiles) {
      const filePath = join(articlesDir, file);
      const content = readFileSync(filePath, 'utf8');
      
      const frontmatter = parseFrontmatter(content);
      if (!frontmatter) {
        console.log(`⚠️  Skipping ${file} - no frontmatter found`);
        continue;
      }
      
      const title = frontmatter.title || 'Untitled';
      const category = frontmatter.category || '';
      const slug = file.replace('.md', '');
      
      console.log(`🖼️  Generating OG image for: ${title}`);
      
      try {
        const imageResponse = await generateOGImage(title, category);
        const arrayBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const outputPath = join(ogDir, `${slug}.png`);
        writeFileSync(outputPath, buffer);
        
        generatedCount++;
        
        // Save sample output info for first few images
        if (sampleOutputs.length < 5) {
          sampleOutputs.push({
            file: `${slug}.png`,
            title: title,
            category: category,
            size: `${buffer.length} bytes`
          });
        }
        
        console.log(`✅ Generated: /og/${slug}.png`);
        
      } catch (error) {
        console.error(`❌ Failed to generate image for ${file}:`, error.message);
      }
    }
    
    console.log('\n🎉 OG Image Generation Complete!');
    console.log(`📊 Generated ${generatedCount} images`);
    console.log(`📁 Saved to: public/og/`);
    
    if (sampleOutputs.length > 0) {
      console.log('\n📋 Sample Output:');
      sampleOutputs.forEach((sample, index) => {
        console.log(`${index + 1}. ${sample.file}`);
        console.log(`   Title: "${sample.title}"`);
        console.log(`   Category: ${sample.category || 'N/A'}`);
        console.log(`   Size: ${sample.size}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }
}

// Run the script
main();