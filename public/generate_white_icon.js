import Jimp from 'jimp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, 'images', 'pictures', 'logo-favicon.png');
const outputPath = path.join(__dirname, 'images', 'pictures', 'logo-favicon-white.png');

async function main() {
  try {
    const image = await Jimp.read(inputPath);
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];

      if (alpha > 0) { // If not transparent
        this.bitmap.data[idx + 0] = 255;
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    });

    await image.writeAsync(outputPath);
    console.log(`Success: Saved to ${outputPath}`);
  } catch (err) {
    console.error('Error processing image:', err);
    process.exit(1);
  }
}

main();
