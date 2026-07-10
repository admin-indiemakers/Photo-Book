const fs = require('fs');
let html = fs.readFileSync('../index.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let bodyHtml = bodyMatch[1];

bodyHtml = bodyHtml.replace(/class=/g, 'className=');
bodyHtml = bodyHtml.replace(/stroke-width=/g, 'strokeWidth=');
bodyHtml = bodyHtml.replace(/stroke-linecap=/g, 'strokeLinecap=');
bodyHtml = bodyHtml.replace(/for=/g, 'htmlFor=');
bodyHtml = bodyHtml.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// Properly make img and input tags self-closing
// Using a better regex that handles any character inside the tag
bodyHtml = bodyHtml.replace(/<(img|input)([^>]*?)\/?>/g, '<$1$2 />');
bodyHtml = bodyHtml.replace(/<br>/g, '<br />');

// Remove scripts from end
bodyHtml = bodyHtml.replace(/<script[\s\S]*?<\/script>/g, '');

// Fix onsubmit
bodyHtml = bodyHtml.replace(/onsubmit="return false;"/g, 'onSubmit={(e) => e.preventDefault()}');

// Add editor links
bodyHtml = bodyHtml.replace(/<a href="#" className="nav__link" data-magnetic>Create Book<\/a>/g, '<a href="/editor" className="nav__link" data-magnetic>Create Book</a>');
bodyHtml = bodyHtml.replace(/<a href="#" className="btn-cta" data-magnetic>\s*Start Creating <span className="arr">→<\/span>\s*<\/a>/g, '<a href="/editor" className="btn-cta" data-magnetic>\n              Start Creating <span className="arr">→</span>\n            </a>');
bodyHtml = bodyHtml.replace(/<a href="#" className="link-arrow editor__link" data-magnetic>Explore Editor <span>→<\/span><\/a>/g, '<a href="/editor" className="link-arrow editor__link" data-magnetic>Explore Editor <span>→</span></a>');

fs.writeFileSync('src/app/LandingHtml.tsx', 
'\'use client\';\n\n' +
'export const LandingHtml = () => (\n' +
'  <>\n' +
'    ' + bodyHtml + '\n' +
'  </>\n' +
');'
);
console.log('Fixed');
