import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const IMAGES_DIR = './public/images';
const SIZE_LIMIT = 200 * 1024; // 200KB
const TARGET_SIZE = 150 * 1024; // 150KB

async function getFileSize(filePath) {
    const stats = await fs.stat(filePath);
    return stats.size;
}

async function compressImage(inputPath, outputBase) {
    console.log(`\nProcessing: ${inputPath}`);
    
    const originalSize = await getFileSize(inputPath);
    console.log(`Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    
    // Create WebP version at 80% quality
    const webpPath = `${outputBase}.webp`;
    await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(webpPath);
    
    const webpSize = await getFileSize(webpPath);
    console.log(`WebP size: ${(webpSize / 1024).toFixed(2)} KB`);
    
    // Create JPG version at 85% quality
    const jpgPath = `${outputBase}-compressed.jpg`;
    await sharp(inputPath)
        .jpeg({ quality: 85 })
        .toFile(jpgPath);
    
    const jpgSize = await getFileSize(jpgPath);
    console.log(`JPG size: ${(jpgSize / 1024).toFixed(2)} KB`);
    
    return {
        original: inputPath,
        originalSize,
        webp: webpPath,
        webpSize,
        jpg: jpgPath,
        jpgSize,
        savings: originalSize - Math.min(webpSize, jpgSize)
    };
}

async function main() {
    console.log('🔍 Scanning for oversized images...\n');
    
    const files = await fs.readdir(IMAGES_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
    
    const oversizedImages = [];
    
    for (const file of imageFiles) {
        const filePath = path.join(IMAGES_DIR, file);
        const size = await getFileSize(filePath);
        
        console.log(`${file}: ${(size / 1024).toFixed(2)} KB`);
        
        if (size > SIZE_LIMIT) {
            oversizedImages.push({ file, path: filePath, size });
        }
    }
    
    if (oversizedImages.length === 0) {
        console.log('\n✅ All images are already under 200KB!');
        return;
    }
    
    console.log(`\n⚠️  Found ${oversizedImages.length} oversized image(s):\n`);
    
    const results = [];
    
    for (const { file, path: filePath, size } of oversizedImages) {
        const ext = path.extname(file);
        const base = path.basename(file, ext);
        const outputBase = path.join(IMAGES_DIR, base);
        
        const result = await compressImage(filePath, outputBase);
        results.push(result);
        
        // Replace original with best compressed version
        const bestPath = result.webpSize < result.jpgSize ? result.webp : result.jpg;
        const bestSize = Math.min(result.webpSize, result.jpgSize);
        
        if (bestSize < size) {
            // Backup original
            await fs.rename(filePath, `${filePath}.backup`);
            await fs.copyFile(bestPath, filePath);
            console.log(`✅ Replaced ${file} with compressed version (${(bestSize / 1024).toFixed(2)} KB)`);
        } else {
            console.log(`❌ Compression didn't reduce size for ${file}`);
        }
    }
    
    // Summary report
    console.log('\n📊 COMPRESSION REPORT:');
    console.log('=' .repeat(50));
    
    let totalOriginal = 0;
    let totalCompressed = 0;
    
    for (const result of results) {
        const bestSize = Math.min(result.webpSize, result.jpgSize);
        totalOriginal += result.originalSize;
        totalCompressed += bestSize;
        
        console.log(`${path.basename(result.original)}:`);
        console.log(`  Original: ${(result.originalSize / 1024).toFixed(2)} KB`);
        console.log(`  WebP: ${(result.webpSize / 1024).toFixed(2)} KB`);
        console.log(`  JPG: ${(result.jpgSize / 1024).toFixed(2)} KB`);
        console.log(`  Best: ${(bestSize / 1024).toFixed(2)} KB`);
        console.log(`  Savings: ${((result.originalSize - bestSize) / 1024).toFixed(2)} KB (${((result.originalSize - bestSize) / result.originalSize * 100).toFixed(1)}%)`);
        console.log('');
    }
    
    console.log(`Total savings: ${((totalOriginal - totalCompressed) / 1024).toFixed(2)} KB`);
    console.log(`Overall reduction: ${((totalOriginal - totalCompressed) / totalOriginal * 100).toFixed(1)}%`);
}

main().catch(console.error);