const fs = require('fs');
const path = 'c:/Users/KIIT/Documents/Admin-panel/client/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  // Form Labels style: 12px font-weight 500, tracking 0.05em, text-transform uppercase, color #3F3F46
  'text-xs font-semibold text-[#3F3F46] uppercase tracking-[0.08em]': 'text-xs font-medium text-[#3F3F46] uppercase tracking-[0.05em]',
  
  // Table headers styling: uppercase, font-size 11px, letter-spacing 0.08em, color #71717A, font-weight 600
  'text-xs font-bold text-[#71717A] uppercase tracking-wider': 'text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]',
  'text-[11px] font-bold text-[#71717A] uppercase tracking-wider': 'text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]'
};

let count = 0;
for (let [search, replace] of Object.entries(replacements)) {
  // Always escape special characters for exact matching
  const escaped = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  
  const matches = content.match(regex);
  if (matches) {
    count += matches.length;
    content = content.replace(regex, replace);
    console.log(`Replaced ${matches.length} occurrences of [${search}]`);
  }
}

if (count > 0) {
  fs.writeFileSync(path, content, 'utf8');
  console.log(`Successfully completed ${count} replacements.`);
} else {
  console.log('No replacements needed.');
}
