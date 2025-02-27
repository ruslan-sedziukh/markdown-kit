import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'dist', 'index.js'); // Adjust path if needed

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const importStatement = "import './index.css';\n"; // Add newline for clean formatting

  // Check if the import statement already exists.
  if (!data.includes(importStatement)) {
    const updatedData = importStatement + data; // Prepend the import statement
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('CSS import added to index.js');
      }
    });
  } else {
    console.log('CSS import already exists in index.js');
  }
});