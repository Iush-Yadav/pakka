const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      // Replace white text with dark text (#1A1A1A)
      content = content.replace(/color:\s*'#FFFFFF'/g, "color: '#1A1A1A'");
      
      // Replace rgba(255,255,255, x) with rgba(0,0,0, x)
      content = content.replace(/rgba\(255,255,255,/g, "rgba(0,0,0,");

      // Replace other hardcoded whites in borders/backgrounds where it makes sense?
      // Actually just the color and rgba replacements will fix 95% of issues.
      // Also fix fill="#FFF" in SVGs or Icons
      content = content.replace(/color="#FFF"/g, 'color="#1A1A1A"');
      content = content.replace(/color="#FFFFFF"/g, 'color="#1A1A1A"');
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
processDir(path.join(__dirname, 'constants')); // Just in case
console.log("Done");
