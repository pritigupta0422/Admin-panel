const fs = require('fs');
const appPath = 'c:/Users/KIIT/Documents/Admin-panel/client/src/App.jsx';
let content = fs.readFileSync(appPath, 'utf8');

const replacements = {
  // Sidebar Width Desktop
  'className="hidden md:block md:flex-shrink-0 w-[220px] h-full"': 'className="hidden md:block md:flex-shrink-0 w-[240px] h-full"',

  // Sidebar Container bg & borders
  'className="flex flex-col h-full bg-[#0A0A0A] text-zinc-350"': 'className="flex flex-col h-full bg-[#0A0A0A] text-zinc-350 border-r border-[#1F1F1F]"',

  // Sidebar Logo area
  `      {/* Sidebar logo box (pure black bg with inline SVG) */}
      <div className="bg-[#0A0A0A] px-6 py-5 flex flex-col items-start space-y-2 shrink-0">
        <svg width="64" height="26" viewBox="0 0 64 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-none">
          <rect width="64" height="26" rx="13" fill="#FFFFFF" />
          <text x="11" y="17" fill="#0A0A0A" fontFamily="sans-serif" fontSize="11" fontWeight="900">N</text>
          <line x1="23" y1="6" x2="23" y2="20" stroke="#0A0A0A" strokeWidth="1" />
          <path d="M27 13H32L34 9L36 17L38 7L40 19L42 11L44 15L46 13H53" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col">
          <span className="text-white font-bold text-[16px] leading-tight">Nexix</span>
          <span className="text-[#71717A] text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">TECHNOLOGY</span>
        </div>
      </div>`:
  `      {/* Sidebar logo box (pure black bg with inline SVG) */}
      <div className="bg-[#0A0A0A] px-6 py-6 flex flex-col items-start space-y-2.5 shrink-0">
        <svg width="64" height="26" viewBox="0 0 64 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-none">
          <rect width="64" height="26" rx="13" fill="#FFFFFF" />
          <text x="11" y="17" fill="#0A0A0A" fontFamily="sans-serif" fontSize="11" fontWeight="900">N</text>
          <line x1="23" y1="6" x2="23" y2="20" stroke="#0A0A0A" strokeWidth="1" />
          <path d="M27 13H32L34 9L36 17L38 7L40 19L42 11L44 15L46 13H53" stroke="#0A0A0A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="flex flex-col">
          <span className="text-white font-extrabold text-[16px] leading-tight tracking-tight">Nexix</span>
          <span className="text-[#71717A] text-[9px] font-bold uppercase tracking-[0.2em] mt-0.5">TECHNOLOGY</span>
        </div>
      </div>
      <div className="h-px bg-gradient-to-r from-[#2C2C2C] to-transparent w-full" />`,

  // Sidebar nav items padding & margin & glow (active class)
  `                    className={\`flex items-center px-6 py-2.5 text-sm font-medium border-l-2 transition-all duration-150 \${
                      isActive 
                        ? 'border-white text-white bg-[#1A1A1A] font-semibold' 
                        : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]'
                    }\`}`:
  `                    className={\`group flex items-center h-10 px-4 mx-3 rounded-[8px] border-l-2 text-sm font-medium transition-all duration-150 ease-in-out \${
                      isActive 
                        ? 'border-white text-white bg-[#1A1A1A] font-semibold shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]' 
                        : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]'
                    }\`}`,

  // Nav section labels spacing & styles
  `            <span className="px-6 text-[10px] font-bold text-[#3F3F46] uppercase tracking-[0.15em] block mb-2">`:
  `            <span className="px-7 text-[10px] font-bold text-[#3F3F46] uppercase tracking-[0.15em] block mb-2 mt-6 first:mt-0">`,

  // Nav icons slide effect on hover
  `<Icon className={\`w-4 h-4 mr-3 \${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}\`} />`:
  `<Icon className={\`w-[18px] h-[18px] mr-3 transition-transform duration-150 group-hover:translate-x-0.5 \${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}\`} />`,

  // Sidebar footer updates (with avatar circle "NA")
  `      {/* Sidebar bottom footer (with EKG pulse SVG) */}
      <div className="p-4 border-t border-[#2C2C2C] bg-[#070707] flex flex-col items-center justify-center space-y-3 shrink-0">
        <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none">
          <path 
            d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
            strokeOpacity="0.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        <div className="text-[10px] text-[#52525B] font-mono tracking-tight text-center truncate w-full">
          {user?.email || 'admin@nexix.tech'}
        </div>
      </div>`:
  `      {/* Sidebar bottom footer (with EKG pulse SVG & user info) */}
      <div className="p-4 border-t border-[#2C2C2C] bg-[#070707] flex flex-col space-y-3 shrink-0">
        <div className="flex justify-center w-full">
          <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none">
            <path 
              d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
              stroke="#FFFFFF" 
              strokeWidth="1.5" 
              strokeOpacity="0.2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2.5 px-2">
          <div className="w-7 h-7 rounded-full bg-[#2C2C2C] text-white text-[10px] font-bold flex items-center justify-center shadow-sm shrink-0 select-none">
            NA
          </div>
          <div className="text-[10px] text-[#52525B] font-mono tracking-tight truncate flex-1">
            {user?.email || 'admin@nexix.tech'}
          </div>
        </div>
      </div>`,

  // Topbar shadow & title size
  'header className="flex-shrink-0 h-16 bg-white border-b border-[#E4E4E7] flex items-center justify-between px-4 sm:px-6"':
  'header className="flex-shrink-0 h-16 bg-white border-b border-[#E4E4E7] shadow-[0_1px_0_#E4E4E7,0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-between px-4 sm:px-6 z-10"',
  
  'className="ml-2 md:ml-0 text-[18px] font-bold text-[#0A0A0A] tracking-tight flex items-center"':
  'className="ml-2 md:ml-0 text-[20px] font-extrabold text-[#0A0A0A] tracking-tight flex items-center"',

  // Site Preview button shadow
  'className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-[7px] text-xs font-bold hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"':
  'className="flex items-center gap-1.5 px-3 py-1.5 border-[1.5px] border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-[7px] text-xs font-bold hover:bg-[#0A0A0A] hover:text-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-[0.97] cursor-pointer"',

  // Pulsing Notification bell icon indicator (red -> black monochrome)
  '<span className="absolute top-1 right-1 w-2 h-2 bg-[#0A0A0A] rounded-full" />':
  '<span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0A0A0A] border border-white rounded-full notification-pulse" />',

  // Admin initials avatar size
  'className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white text-xs font-bold flex items-center justify-center shadow-md"':
  'className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white text-xs font-bold flex items-center justify-center shadow-md font-bold"',

  // Modal Card Box popups transition
  'animate-[slideUp_0.18s_ease-out]': 'animate-modal-open',

  // Modal label specifications
  'className="text-[11px] font-semibold text-[#3F3F46] uppercase tracking-[0.06em] block mb-1"':
  'className="text-[11px] font-semibold text-[#3F3F46] uppercase tracking-[0.06em] block mb-1.5"',
  
  // Toast spring transitions
  'animate-[slideUp_0.15s_ease-out]': 'animate-toast-in',

  // Top Services progress bar shimmer & taller bars
  `<div className="w-full bg-[#F4F4F5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0A0A0A] h-full rounded-full transition-all duration-300" style={{ width: \`\${percent}%\` }} />
                    </div>`:
  `<div className="w-full bg-[#F4F4F5] h-1.5 rounded-full overflow-hidden relative">
                      <div className="bg-[#0A0A0A] h-full rounded-full transition-all duration-300 relative bar-shimmer" style={{ width: \`\${percent}%\` }} />
                    </div>`,
  'className="flex justify-between text-xs font-semibold"': 'className="flex justify-between text-xs font-medium"',
  'className="text-[#0A0A0A] font-semibold">{service.count} leads</span>': 'className="text-[#0A0A0A] font-bold text-[13px]">{service.count} leads</span>',
  'className="space-y-4.5"': 'className="space-y-4"',

  // Segmented date filters selector inside AnalyticsView
  `<div className="flex gap-2">
            {[
              { id: 'this_week', name: 'This Week' },
              { id: 'this_month', name: 'This Month' },
              { id: 'last_3_months', name: 'Last 3 Months' }
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setDateRange(btn.id)}
                className={\`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer border transition-colors \${
                  dateRange === btn.id 
                    ? 'bg-[#0A0A0A] border-[#0A0A0A] text-white' 
                    : 'bg-white border-[#D4D4D8] text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
                }\`}
              >
                {btn.name}
              </button>
            ))}
          </div>`:
  `<div className="flex border border-[#D4D4D8] rounded-[8px] overflow-hidden bg-white">
            {[
              { id: 'this_week', name: 'This Week' },
              { id: 'this_month', name: 'This Month' },
              { id: 'last_3_months', name: 'Last 3 Months' }
            ].map((btn, idx, arr) => (
              <button
                key={btn.id}
                onClick={() => setDateRange(btn.id)}
                className={\`px-4 py-1.5 text-xs font-semibold cursor-pointer border-r last:border-r-0 border-[#D4D4D8] transition-all \${
                  dateRange === btn.id 
                    ? 'bg-[#0A0A0A] text-white' 
                    : 'bg-white text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
                }\`}
              >
                {btn.name}
              </button>
            ))}
          </div>`
};

let count = 0;
for (let [search, replace] of Object.entries(replacements)) {
  const escaped = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escaped, 'g');
  
  const matches = content.match(regex);
  if (matches) {
    count += matches.length;
    content = content.replace(regex, replace);
    console.log(`Replaced ${matches.length} occurrences of [${search.substring(0, 30)}...]`);
  }
}

// Write back updated code
fs.writeFileSync(appPath, content, 'utf8');
console.log(`Completed ${count} layout replacements.`);
