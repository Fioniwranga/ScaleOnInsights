const { Jimp } = require('jimp');
const path = require('path');

const imgDir = 'c:\\Users\\asesh\\Desktop\\ss\\image';
const file = 'Amazon Marketplace Solutions.png';

async function main() {
  const image = await Jimp.read(path.join(imgDir, file));
  image.resize({ w: 1000, h: 1000 });
  const w = 1000;
  const h = 1000;
  
  // Find all white pixels (R > 250, G > 250, B > 250)
  const isWhite = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = image.getPixelColor(x, y);
      const r = (p >> 24) & 0xff;
      const g = (p >> 16) & 0xff;
      const b = (p >> 8) & 0xff;
      const a = p & 0xff;
      if (a > 200 && r > 240 && g > 240 && b > 240) {
        isWhite[y * w + x] = 1;
      }
    }
  }
  
  // Run BFS on white pixels to find contiguous white blocks
  const visited = new Uint8Array(w * h);
  const blocks = [];
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (isWhite[idx] && !visited[idx]) {
        // BFS
        const queue = [[x, y]];
        visited[idx] = 1;
        let minX = x, maxX = x;
        let minY = y, maxY = y;
        let count = 0;
        
        let head = 0;
        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          count++;
          if (cx < minX) minX = cx;
          if (cx > maxX) maxX = cx;
          if (cy < minY) minY = cy;
          if (cy > maxY) maxY = cy;
          
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = cx + dx;
              const ny = cy + dy;
              if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
                const nidx = ny * w + nx;
                if (isWhite[nidx] && !visited[nidx]) {
                  visited[nidx] = 1;
                  queue.push([nx, ny]);
                }
              }
            }
          }
        }
        
        if (count > 100) {
          blocks.push({ minX, maxX, minY, maxY, count });
        }
      }
    }
  }
  
  console.log(`Found ${blocks.length} white blocks:`);
  blocks.sort((a, b) => b.count - a.count);
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    console.log(`Block ${i}: pixels=${b.count}, box=[${b.minX}, ${b.minY}, ${b.maxX}, ${b.maxY}], size=${b.maxX-b.minX}x${b.maxY-b.minY}`);
  }
}

main().catch(console.error);
