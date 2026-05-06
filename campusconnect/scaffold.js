import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicPages = ['Login', 'Signup', 'Welcome'];
const protectedPages = [
  'Dashboard', 'Marketplace', 'ProductDetails', 'Cart', 'Checkout',
  'Jobs', 'JobDetails', 'ResumeBuilder', 'Messages', 'Events',
  'Profile', 'Settings', 'Verification'
];

function createBoilerplate(name, isProtected) {
  return `import React from 'react';\nimport { Container } from 'react-bootstrap';\n\nconst ${name} = () => {\n  return (\n    <Container className="py-5">\n      <h2>${name}</h2>\n      <p>Placeholder for ${name}</p>\n    </Container>\n  );\n};\n\nexport default ${name};\n`;
}

function scaffoldPages(pages, subfolder) {
  pages.forEach(page => {
    const filePath = path.join(__dirname, 'src', 'pages', subfolder, `${page}.jsx`);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, createBoilerplate(page, subfolder === 'protected'));
      console.log(`Created ${filePath}`);
    }
  });
}

scaffoldPages(publicPages, 'public');
scaffoldPages(protectedPages, 'protected');
