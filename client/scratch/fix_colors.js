const fs = require('fs');
const path = 'c:/Users/KIIT/Documents/Admin-panel/client/src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = {
  // Backdrop blur classes
  'backdrop-blur-xs': 'backdrop-blur-sm',
  
  // Font sizes for metric cards
  'text-28px': 'text-[28px]',
  
  // Form Labels style: 12px font-weight 500, tracking 0.05em, text-transform uppercase, color #3F3F46
  'text-xs font-semibold text-[#3F3F46] uppercase tracking-[0.08em]': 'text-xs font-medium text-[#3F3F46] uppercase tracking-[0.05em]',
  
  // Table headers styling: uppercase, font-size 11px, letter-spacing 0.08em, color #71717A, font-weight 600
  'text-xs font-bold text-[#71717A] uppercase tracking-wider': 'text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]',
  'text-[11px] font-bold text-[#71717A] uppercase tracking-wider': 'text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]',

  // Live on Site badge inside PortfolioView (replace green badge with brand black pill)
  'bg-[#EAF3DE] text-[#3B6D11] border border-[#3B6D11]/15">\\n                          Live on Site': 'bg-[#0A0A0A] text-white border border-[#0A0A0A]/10">\\n                          Live on Site',
  
  // Live badge configuration in CareersView
  "live: 'bg-[#EAF3DE] text-[#3B6D11] border border-[#3B6D11]/15'": "live: 'bg-[#0A0A0A] text-white border border-[#0A0A0A]/10'",

  // Cancel buttons in forms (use outline/secondary style: border 1.5px #0A0A0A, text #0A0A0A, background white, hover bg #F4F4F5)
  'className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-550 hover:bg-gray-55"': 'className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-sm font-semibold"',
  'className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-500 hover:bg-gray-55"': 'className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-sm font-semibold"',
  'className="px-4 py-2 border border-gray-300 text-sm font-semibold rounded-md text-gray-500 hover:bg-gray-50"': 'className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-sm font-semibold"',
  'className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-500 hover:bg-gray-50 cursor-pointer font-sans"': 'className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-xs font-semibold cursor-pointer font-sans"',
  'className="px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-550 hover:bg-gray-55 cursor-pointer font-sans"': 'className="px-4 py-2 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-md hover:bg-[#F4F4F5] text-xs font-semibold cursor-pointer font-sans"'
};

let count = 0;
for (let [search, replace] of Object.entries(replacements)) {
  // Resolve escaped characters
  search = search.replace(/\\n/g, '\n');
  replace = replace.replace(/\\n/g, '\n');

  let regex;
  if (search.includes('"') || search.includes("'") || search.includes('>') || search.includes('\n')) {
    regex = new RegExp(search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
  } else {
    regex = new RegExp(`\\b${search}\\b`, 'g');
  }
  
  const matches = content.match(regex);
  if (matches) {
    count += matches.length;
    content = content.replace(regex, replace);
    console.log(`Replaced ${matches.length} occurrences of [${search.substring(0, 40)}...]`);
  }
}

if (count > 0) {
  fs.writeFileSync(path, content, 'utf8');
  console.log(`Successfully completed ${count} replacements.`);
} else {
  console.log('No replacements needed.');
}
