import fs from 'fs';

const processSvg = (svgPath, prefix) => {
  let content = fs.readFileSync(svgPath, 'utf-8');
  // Match all base64 data URIs
  const regex = /data:image\/([^;]+);base64,([^"'\s>]+)/g;
  const matches = [...content.matchAll(regex)];
  
  if (matches.length === 0) {
    console.log(`No more base64 images found in ${svgPath}`);
    return;
  }
  
  // To avoid overwriting img-1, we find the highest index existing or just start at 2 since we already wrote 1.
  let i = 2;
  
  for (const match of matches) {
    const ext = match[1];
    // Remove any newlines or spaces from base64 if present, though [^"'\s>] prevents spaces.
    const b64 = match[2].replace(/\s/g, ''); 
    const imgPath = `/${prefix}-${i}.${ext}`;
    const fullPath = `./public/${prefix}-${i}.${ext}`;
    
    fs.writeFileSync(fullPath, Buffer.from(b64, 'base64'));
    console.log(`Saved ${fullPath} (${Math.round(fs.statSync(fullPath).size / 1024)} KB)`);
    
    // Replace in content
    // Because match[0] could be huge, we use literal replacement.
    content = content.replace(match[0], imgPath);
    i++;
  }
  
  fs.writeFileSync(svgPath, content);
  console.log(`Updated ${svgPath} to size ${Math.round(content.length / 1024)} KB`);
}

processSvg('./src/SDH logo.svg', 'sdh-logo-img');
processSvg('./src/Glow savitri logo.svg', 'glow-logo-img');
