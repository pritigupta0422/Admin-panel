const fs = require('fs');

const appPath = 'c:/Users/KIIT/Documents/Admin-panel/client/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

const appReplacements = {
  // Leftover draft badge styling in BlogView
  "draft: 'bg-[#FAEEDA] text-[#854F0B] border border-[#854F0B]/15',": "draft: 'bg-transparent text-[#71717A] border border-[#D4D4D8] rounded-full',",

  // Collapsible Status Dots colors in content status panel
  "liveBlogsCount > 0 ? 'bg-green-500' : 'bg-gray-400'": "liveBlogsCount > 0 ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D8]'",
  "visibleProjectsCount > 0 ? 'bg-green-500' : 'bg-gray-400'": "visibleProjectsCount > 0 ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D8]'",
  "openCareersCount > 0 ? 'bg-green-500' : 'bg-gray-400'": "openCareersCount > 0 ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D8]'",
  "teamVisibleCount > 0 ? 'bg-green-500' : 'bg-gray-400'": "teamVisibleCount > 0 ? 'bg-[#0A0A0A]' : 'bg-[#D4D4D8]'"
};

let count = 0;
for (let [search, replace] of Object.entries(appReplacements)) {
  const escaped = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  
  const matches = appContent.match(regex);
  if (matches) {
    count += matches.length;
    appContent = appContent.replace(regex, replace);
    console.log(`Replaced ${matches.length} occurrences of [${search.substring(0, 30)}...]`);
  }
}

// Write cleaned file back
fs.writeFileSync(appPath, appContent, 'utf8');
console.log(`Successfully completed ${count} replacements in App.jsx.`);
