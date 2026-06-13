const fs = require('fs');
const path = require('path');

const appPath = path.resolve(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8').replace(/\r\n/g, '\n');

const replacements = [
  // 1. Sidebar Width Desktop
  {
    search: 'className="hidden md:block md:flex-shrink-0 w-[220px] h-full"',
    replace: 'className="hidden md:block md:flex-shrink-0 w-[240px] h-full"'
  },
  // 2. Sidebar Layout
  {
    search: `  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0A0A0A] text-zinc-350">
      
      {/* Sidebar logo box (white container housing logo.jpeg) */}
      <div className="bg-white p-4 border-b border-[#E2E8F0] flex justify-center items-center h-16 shrink-0">
        <img 
          src="/logo.jpeg" 
          alt="Nexix Technology" 
          className="w-[140px] h-auto object-contain" 
        />
      </div>

      <nav className="flex-1 overflow-y-auto py-6 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-6 text-[10px] font-bold text-[#52525B] uppercase tracking-widest block mb-2">
              {section.title}
            </span>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={\`flex items-center px-6 py-2.5 text-sm font-medium border-l-2 transition-all duration-150 \${
                      isActive 
                        ? 'border-white text-white bg-[#1A1A1A] font-semibold' 
                        : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]'
                    }\`}
                  >
                    <Icon className={\`w-4 h-4 mr-3 \${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}\`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar bottom footer (with EKG pulse SVG) */}
      <div className="p-4 border-t border-zinc-800 bg-[#070707] flex flex-col items-center justify-center space-y-3 shrink-0">
        <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none">
          <path 
            d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
            stroke="#FFFFFF" 
            strokeWidth="1.5" 
            strokeOpacity="0.3" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
        <div className="text-[10px] text-[#52525B] font-mono tracking-tight text-center truncate w-full">
          {user?.email || 'admin@nexix.tech'}
        </div>
      </div>
    </div>
  );`,
    replace: `  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0A0A0A] text-zinc-350 border-r border-[#1F1F1F]">
      
      {/* Sidebar logo box (white container housing logo.jpeg) */}
      <div className="bg-white p-6 flex justify-center items-center shrink-0">
        <img 
          src="/logo.jpeg" 
          alt="Nexix Technology" 
          className="w-[140px] h-auto object-contain" 
        />
      </div>
      <div className="h-px bg-gradient-to-r from-[#2C2C2C] to-transparent w-full shrink-0" />

      <nav className="flex-1 overflow-y-auto py-6 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-7 text-[10px] font-bold text-[#3F3F46] uppercase tracking-[0.12em] block mb-2 mt-6 first:mt-0">
              {section.title}
            </span>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={\`group flex items-center h-10 px-4 mx-3 rounded-lg border-l-2 text-sm font-medium transition-all duration-150 ease-in-out \${
                      isActive 
                        ? 'border-white text-white bg-[#1A1A1A] font-semibold shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]' 
                        : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]'
                    }\`}
                  >
                    <Icon className={\`w-[18px] h-[18px] mr-3 transition-transform duration-150 group-hover:translate-x-[2px] \${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}\`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar bottom footer (with EKG pulse SVG) */}
      <div className="p-4 border-t border-[#1F1F1F] bg-[#070707] flex flex-col space-y-3.5 shrink-0">
        <div className="flex justify-center">
          <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none opacity-40">
            <path 
              d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
              stroke="#FFFFFF" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2 px-1">
          <div className="w-7 h-7 rounded-full bg-[#2C2C2C] text-white text-[10px] font-bold flex items-center justify-center shadow-inner select-none shrink-0">
            NA
          </div>
          <div className="text-[10px] text-[#52525B] font-mono tracking-tight truncate flex-1">
            {user?.email || 'admin@nexix.tech'}
          </div>
        </div>
      </div>
    </div>
  );`
  },
  // 3. Topbar shadow, headers and buttons
  {
    search: '<header className="flex-shrink-0 h-16 bg-white border-b border-[#E4E4E7] flex items-center justify-between px-4 sm:px-6">',
    replace: '<header className="flex-shrink-0 h-16 bg-white border-b border-[#E4E4E7] shadow-[0_1px_0_#E4E4E7,0_4px_12px_rgba(0,0,0,0.04)] flex items-center justify-between px-4 sm:px-6 z-10">'
  },
  {
    search: `            <div className="flex items-center">
              <h2 className="ml-2 md:ml-0 text-[18px] font-semibold text-[#0A0A0A] tracking-tight flex items-center">
                {getPageTitle()}
                {/* Dashboard EKG Pulse animates once on load */}
                {location.pathname === '/' && (
                  <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="inline-block ml-2.5 select-none">
                    <path 
                      d="M0 6H8L10 2L12 10L14 4L16 8L18 6H24" 
                      stroke="#0A0A0A" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="pulse-animate-once"
                    />
                  </svg>
                )}
              </h2>
            </div>`,
    replace: `            <div className="flex items-center">
              <h2 className="ml-2 md:ml-0 text-[20px] font-extrabold text-[#0A0A0A] tracking-tight flex items-center">
                {getPageTitle()}
                <svg width="24" height="12" viewBox="0 0 24 12" fill="none" className="inline-block ml-2.5 select-none animate-pulse">
                  <path 
                    d="M0 6H8L10 2L12 10L14 4L16 8L18 6H24" 
                    stroke="#0A0A0A" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </h2>
            </div>`
  },
  {
    search: `            {/* Site Preview Button */}
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-lg text-xs font-bold hover:bg-[#0A0A0A] hover:text-white transition-colors cursor-pointer"
            >`,
    replace: `            {/* Site Preview Button */}
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#0A0A0A] text-[#0A0A0A] bg-white rounded-lg text-xs font-bold hover:bg-[#0A0A0A] hover:text-white transition-all shadow-[0_1px_4px_rgba(0,0,0,0.1)] active:scale-[0.97] cursor-pointer"
            >`
  },
  {
    search: `            {/* Bell Icon */}
            <button className="p-1.5 rounded-full text-[#71717A] hover:bg-gray-100 hover:text-[#0A0A0A] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#0A0A0A] rounded-full" />
            </button>`,
    replace: `            {/* Bell Icon */}
            <button className="p-1.5 rounded-full text-[#71717A] hover:bg-gray-100 hover:text-[#0A0A0A] transition-colors relative active:scale-[0.97]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0A0A0A] border border-white rounded-full notification-pulse" />
            </button>`
  },
  {
    search: `            {/* Initials Circle */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white text-xs font-bold flex items-center justify-center shadow-md">
                {user?.initials || 'NA'}
              </div>`,
    replace: `            {/* Initials Circle */}
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#0A0A0A] text-white text-xs font-bold flex items-center justify-center shadow-md font-bold">
                {user?.initials || 'NA'}
              </div>`
  },
  {
    search: `            {/* Logout button */}
            <button 
              onClick={handleLogout}
              className="flex items-center px-2.5 py-1.5 text-sm font-semibold text-[#71717A] hover:text-[#0A0A0A] rounded-md transition-colors"
            >`,
    replace: `            {/* Logout button */}
            <button 
              onClick={handleLogout}
              className="flex items-center px-2.5 py-1.5 text-sm font-semibold text-[#71717A] hover:text-[#0A0A0A] rounded-md transition-all active:scale-[0.97]"
            >`
  },
  // 4. Toast entry transition
  {
    search: 'className="p-4 rounded-[8px] bg-[#0A0A0A] text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-between border border-[#2C2C2C] animate-[slideUp_0.15s_ease-out] font-sans"',
    replace: 'className="p-4 rounded-[8px] bg-[#0A0A0A] text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-between border border-[#2C2C2C] animate-toast-in font-sans"'
  },
  // 5. Modal transition & field spacing
  {
    search: 'className={`relative bg-white rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-0.5 border-gray-200 w-full ${sizeClasses} overflow-hidden flex flex-col max-h-[90vh] z-10 animate-[slideUp_0.18s_ease-out]`}',
    replace: 'className={`relative bg-white rounded-[12px] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border-0.5 border-gray-200 w-full ${sizeClasses} overflow-hidden flex flex-col max-h-[90vh] z-10 animate-modal-open`}'
  },
  {
    search: 'className="text-[11px] font-semibold text-[#3F3F46] uppercase tracking-[0.06em] block mb-1"',
    replace: 'className="text-[11px] font-semibold text-[#3F3F46] uppercase tracking-[0.06em] block mb-1.5"'
  },
  // 6. Dashboard metric cards
  {
    search: `      {/* 4 Metric Cards Grid (with left borders and top-right icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Leads Card */}
        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative">
          <div>
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Total Leads</span>
            <span className="text-[28px] font-bold text-[#0A0A0A] mt-1 block">{totalLeads}</span>
            <span className="text-xs text-[#71717A] block mt-1.5 font-medium">
              {newThisWeek} new this week
            </span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><FileText className="w-4.5 h-4.5" /></div>
        </div>

        {/* Projects Card */}
        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative">
          <div>
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Total Projects</span>
            <span className="text-[28px] font-bold text-[#0A0A0A] mt-1 block">{totalProjects}</span>
            <span className="text-xs text-[#71717A] block mt-1.5 font-medium">
              {liveProjects} live on site
            </span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Briefcase className="w-4.5 h-4.5" /></div>
        </div>

        {/* Blogs Card */}
        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative">
          <div>
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Blog Posts</span>
            <span className="text-[28px] font-bold text-[#0A0A0A] mt-1 block">{totalBlogs}</span>
            <span className="text-xs text-[#71717A] block mt-1.5 font-medium">
              {draftsPending} drafts pending
            </span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><BookOpen className="w-4.5 h-4.5" /></div>
        </div>

        {/* Team Members Card */}
        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative">
          <div>
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Team Members</span>
            <span className="text-[28px] font-bold text-[#0A0A0A] mt-1 block">{totalTeam}</span>
            <span className="text-xs text-[#71717A] block mt-1.5 font-medium">
              {activeTeam} active
            </span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Users className="w-4.5 h-4.5" /></div>
        </div>
      </div>`,
    replace: `      {/* 4 Metric Cards Grid (with left borders and top-right icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Leads Card */}
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div>
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Total Leads</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight mt-1 block leading-none">{totalLeads}</span>
            <span className="text-[13px] text-[#71717A] block mt-2 font-normal">
              ↑ {newThisWeek} new this week
            </span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><FileText className="w-5 h-5" /></div>
        </div>

        {/* Projects Card */}
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div>
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Total Projects</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight mt-1 block leading-none">{totalProjects}</span>
            <span className="text-[13px] text-[#71717A] block mt-2 font-normal">
              ● {liveProjects} live on site
            </span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Briefcase className="w-5 h-5" /></div>
        </div>

        {/* Blogs Card */}
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div>
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Blog Posts</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight mt-1 block leading-none">{totalBlogs}</span>
            <span className="text-[13px] text-[#71717A] block mt-2 font-normal">
              → {draftsPending} drafts pending
            </span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><BookOpen className="w-5 h-5" /></div>
        </div>

        {/* Team Members Card */}
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div>
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Team Members</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight mt-1 block leading-none">{totalTeam}</span>
            <span className="text-[13px] text-[#71717A] block mt-2 font-normal">
              ● {activeTeam} active
            </span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Users className="w-5 h-5" /></div>
        </div>
      </div>`
  },
  // 7. Dashboard Panels: Recent Leads & Top Services
  {
    search: `      {/* Main Panels grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads */}
        <div className="bg-white rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col h-full lg:col-span-2 overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E4E4E7] flex items-center justify-between">
            <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider">Recent Leads</h3>
            <Link to="/leads" className="text-xs font-semibold text-[#0A0A0A] hover:underline">Manage Leads</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Name</th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Service</th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="table-row">
                    <td className="px-6 py-3 text-sm font-semibold text-gray-800">{lead.name}</td>
                    <td className="px-6 py-3 text-sm text-gray-500">{lead.service}</td>
                    <td className="px-6 py-3">
                      <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${leadBadge[lead.status]}\`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services Progress Chart */}
        <div className="bg-white p-6 rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider mb-4">Top Services</h3>
            <div className="space-y-4.5">
              {topServices.slice(0, 5).map(service => {
                const percent = (service.count / maxServiceCount) * 100;
                return (
                  <div key={service.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-750">{service.name}</span>
                      <span className="text-[#0A0A0A]">{service.count} leads</span>
                    </div>
                    <div className="w-full bg-[#F4F4F5] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0A0A0A] h-full rounded-full transition-all duration-300" style={{ width: \`\${percent}%\` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>`,
    replace: `      {/* Main Panels grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Leads */}
        <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col h-full lg:col-span-2 overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E4E4E7] flex items-center justify-between">
            <h3 className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-[0.1em]">Recent Leads</h3>
            <Link to="/leads" className="border border-[#E4E4E7] text-[11px] px-3 py-1 rounded-[20px] text-[#71717A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 ease-out cursor-pointer inline-flex items-center font-medium">Manage Leads</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-container">
              <thead>
                <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Name</th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Service</th>
                  <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4E7]">
                {recentLeads.map(lead => (
                  <tr key={lead.id} className="table-row">
                    <td className="px-6 py-3.5 text-sm font-semibold text-[#0A0A0A]">{lead.name}</td>
                    <td className="px-6 py-3.5 text-sm text-[#71717A] font-normal">{lead.service}</td>
                    <td className="px-6 py-3.5">
                      <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${leadBadge[lead.status]}\`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Services Progress Chart */}
        <div className="bg-white p-6 rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col justify-between">
          <div>
            <h3 className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-[0.1em] mb-5">Top Services</h3>
            <div className="space-y-4">
              {topServices.slice(0, 5).map(service => {
                const percent = (service.count / maxServiceCount) * 100;
                return (
                  <div key={service.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-[#0A0A0A] font-medium">{service.name}</span>
                      <span className="text-[#0A0A0A] font-bold text-[13px]">{service.count} leads</span>
                    </div>
                    <div className="w-full bg-[#F4F4F5] h-1.5 rounded-full overflow-hidden relative">
                      <div className="bg-[#0A0A0A] h-full rounded-full transition-all duration-300 relative bar-shimmer" style={{ width: \`\${percent}%\` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>`
  },
  // 8. Dashboard highlights rows
  {
    search: `      {/* Highlights Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Portfolio highlights */}
        <div className="bg-white rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider">Portfolio Highlights</h3>
            <Link to="/portfolio" className="text-xs font-semibold text-[#0A0A0A] hover:underline">Manage Projects</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioHighlights.map(proj => (
              <div key={proj.id} className="p-4 bg-gray-50 border border-zinc-200 rounded-[10px] flex flex-col justify-between hover:shadow-xs transition-shadow">
                <span className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider">{proj.category}</span>
                <h4 className="text-sm font-bold text-[#0A0A0A] mt-1 line-clamp-1">{proj.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div className="bg-white rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider">Latest Blog Posts</h3>
            <Link to="/blog" className="text-xs font-semibold text-[#0A0A0A] hover:underline">Manage Blog</Link>
          </div>
          <ol className="divide-y divide-gray-100 flex-1">
            {recentBlogs.map((post, index) => (
              <li key={post.id} className="py-2.5 flex items-start">
                <span className="text-xs font-bold text-gray-400 mr-2.5 mt-0.5">{index + 1}.</span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-gray-700 truncate">{post.title}</h4>
                  <div className="text-[10px] text-gray-500 mt-0.5">by {post.author} • {post.category}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </div>`,
    replace: `      {/* Highlights Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Portfolio highlights */}
        <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-[0.1em]">Portfolio Highlights</h3>
            <Link to="/portfolio" className="border border-[#E4E4E7] text-[11px] px-3 py-1 rounded-[20px] text-[#71717A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 ease-out cursor-pointer inline-flex items-center font-medium">Manage Projects</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {portfolioHighlights.map(proj => (
              <div key={proj.id} className="p-5 bg-white border border-[#E4E4E7] rounded-[12px] flex flex-col justify-between items-start gap-4 transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:border-[#0A0A0A] hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <span className="bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-[4px] inline-block select-none">
                  {proj.category}
                </span>
                <div className="w-full">
                  <h4 className="text-[15px] font-bold text-[#0A0A0A] line-clamp-1 leading-tight">{proj.name}</h4>
                  <p className="text-[12px] text-[#71717A] mt-1 font-normal leading-none">{proj.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[13px] font-bold text-[#0A0A0A] uppercase tracking-[0.1em]">Latest Blog Posts</h3>
            <Link to="/blog" className="border border-[#E4E4E7] text-[11px] px-3 py-1 rounded-[20px] text-[#71717A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-200 ease-out cursor-pointer inline-flex items-center font-medium">Manage Blog</Link>
          </div>
          <ol className="flex-1 flex flex-col">
            {recentBlogs.map((post, index) => {
              const numStr = String(index + 1).padStart(2, '0');
              return (
                <li key={post.id} className="group py-3 flex items-center justify-between border-b border-dashed border-[#E4E4E7] last:border-b-0 hover:bg-[#FAFAFA]/50 px-2 -mx-2 rounded-lg transition-colors duration-150">
                  <div className="flex items-start min-w-0">
                    <span className="text-[11px] text-[#D4D4D8] font-bold mr-3 mt-0.5 select-none w-4 text-right" style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {numStr}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-semibold text-[#0A0A0A] group-hover:underline truncate leading-snug">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-[11px] text-[#71717A] mt-0.5 font-normal">
                        <span>by {post.author}</span>
                        <span className="mx-1.5 text-gray-300">•</span>
                        <span>{post.category}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-[#71717A] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150 pl-2 select-none shrink-0">
                    →
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

      </div>`
  },
  // 9. Website status panel collapsible
  {
    search: `      {/* Website Content Status collapsible side panel */}
      <div className="bg-white rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <button
          onClick={() => setIsStatusExpanded(!isStatusExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between font-bold text-sm text-[#0A0A0A] bg-[#FAFAFA] cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-[#0A0A0A]" />
            <span className="uppercase tracking-wide font-bold">Website Content Status Panel</span>
          </div>`,
    replace: `      {/* Website Content Status collapsible side panel */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
        <button
          onClick={() => setIsStatusExpanded(!isStatusExpanded)}
          className="w-full px-6 py-[18px] flex items-center justify-between font-bold text-sm text-[#0A0A0A] bg-[#FAFAFA]/70 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4.5 h-4.5 text-[#0A0A0A]" />
            <span className="uppercase tracking-wide font-bold">Website Content Status Panel</span>
          </div>`
  },
  // 10. LeadsView Page Header, Search bar, Actions and Pagination
  {
    search: `function LeadsView() {
  const { leads, setLeads, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new'
  });

  // Filter & Search
  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleOpenAdd = () => {
    setSelectedLead(null);
    setFormData({ name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setFormData({ ...lead });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(\`Are you sure you want to delete lead \${name}?\`)) {
      setLeads(prev => prev.filter(l => l.id !== id));
      addToast(\`Lead "\${name}" deleted successfully\`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.source.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...formData } : l));
      addToast(\`Lead "\${formData.name}" details updated\`, 'success');
    } else {
      const newLead = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setLeads(prev => [newLead, ...prev]);
      addToast(\`New lead "\${formData.name}" created\`, 'success');
    }
    setIsModalOpen(false);
  };

  const badge = {
    new: 'bg-[#F4F4F5] text-[#0A0A0A] border border-[#0A0A0A]/15',
    in_progress: 'bg-[#2C2C2C] text-[#FFFFFF] rounded-full',
    done: 'bg-[#F4F4F5] text-[#0A0A0A] border border-[#D4D4D8] rounded-full'
  };

  return (
    <div className="space-y-6">
      
      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Search className="w-4.5 h-4.5" /></span>
          <input 
            type="text"
            placeholder="Search leads by name or service..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
          />
        </div>
        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-[7px] transition-colors shadow-premium flex items-center justify-center cursor-pointer font-sans"
        >
          <Plus className="w-4.5 h-4.5 mr-1.5" /> Add Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Name</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Service</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Source</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Date</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {paginated.length > 0 ? (
                paginated.map(lead => (
                  <tr key={lead.id} className="table-row">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-800">{lead.name}</div>
                      <div className="text-xs text-gray-400">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{lead.source}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{lead.created_at}</td>
                    <td className="px-6 py-4">
                      <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${badge[lead.status]}\`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-1.5">
                      <button onClick={() => handleOpenEdit(lead)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A]" title="Edit lead"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(lead.id, lead.name)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Delete lead"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                    No leads found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first lead</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-[#FAFAFA] flex items-center justify-between">
            <span className="text-xs text-gray-400">Page {page} of {totalPages} ({filtered.length} items)</span>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1 border border-gray-300 rounded-md disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1 border border-gray-300 rounded-md disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>`,
    replace: `function LeadsView() {
  const { leads, setLeads, addToast } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // Modal forms
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new'
  });

  // Filter & Search
  const filtered = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleOpenAdd = () => {
    setSelectedLead(null);
    setFormData({ name: '', email: '', phone: '', service: '', source: '', notes: '', status: 'new' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (lead) => {
    setSelectedLead(lead);
    setFormData({ ...lead });
    setIsModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(\`Are you sure you want to delete lead \${name}?\`)) {
      setLeads(prev => prev.filter(l => l.id !== id));
      addToast(\`Lead "\${name}" deleted successfully\`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.source.trim()) {
      addToast('Please fill in all mandatory fields', 'error');
      return;
    }

    if (selectedLead) {
      setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, ...formData } : l));
      addToast(\`Lead "\${formData.name}" details updated\`, 'success');
    } else {
      const newLead = {
        id: Date.now().toString(),
        ...formData,
        created_at: new Date().toISOString().split('T')[0]
      };
      setLeads(prev => [newLead, ...prev]);
      addToast(\`New lead "\${formData.name}" created\`, 'success');
    }
    setIsModalOpen(false);
  };

  const badge = {
    new: 'bg-[#F4F4F5] text-[#0A0A0A] border border-[#0A0A0A]/15',
    in_progress: 'bg-[#2C2C2C] text-[#FFFFFF] rounded-full',
    done: 'bg-[#F4F4F5] text-[#0A0A0A] border border-[#D4D4D8] rounded-full'
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Leads</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Manage and track all incoming client inquiries and leads.</p>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A1A1AA]"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search leads..."
            value={searchTerm}
            onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
            className="w-full h-10 pl-10 pr-4 border border-[#D4D4D8] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A1A1AA] bg-white shadow-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all duration-150"
          />
        </div>
        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0A0A0A] hover:bg-[#2C2C2C] active:scale-[0.97] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0 stroke-[2.5]" /> Add Lead
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Name</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Service</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Source</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Date</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {paginated.length > 0 ? (
                paginated.map(lead => (
                  <tr key={lead.id} className="table-row">
                    <td className="px-6 py-3.5">
                      <div className="text-sm font-semibold text-[#0A0A0A]">{lead.name}</div>
                      <div className="text-xs text-[#71717A] mt-0.5">{lead.email}</div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-[#3F3F46]">{lead.service}</td>
                    <td className="px-6 py-3.5 text-sm text-[#71717A]">{lead.source}</td>
                    <td className="px-6 py-3.5 text-sm text-[#71717A]">{lead.created_at}</td>
                    <td className="px-6 py-3.5">
                      <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${badge[lead.status]}\`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-right space-x-1.5">
                      <button onClick={() => handleOpenEdit(lead)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] active:scale-[0.97]" title="Edit lead"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(lead.id, lead.name)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] transition-colors duration-150 active:scale-[0.97]" title="Delete lead"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-[#71717A]">
                    No leads found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first lead</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-150 bg-[#FAFAFA]/30 flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <div className="sm:absolute sm:left-6 text-xs text-[#71717A] font-medium">
              Showing page {page} of {totalPages} ({filtered.length} entries)
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 border border-[#D4D4D8] text-xs font-semibold rounded-full text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] disabled:opacity-45 disabled:pointer-events-none transition-all active:scale-[0.97] cursor-pointer"
              >
                Previous
              </button>
              
              <div className="w-8 h-8 rounded-full bg-[#0A0A0A] text-white text-xs font-bold flex items-center justify-center shadow-sm select-none">
                {page}
              </div>
              
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 border border-[#D4D4D8] text-xs font-semibold rounded-full text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5] disabled:opacity-45 disabled:pointer-events-none transition-all active:scale-[0.97] cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>`
  },
  // 11. PortfolioView Page Header, Search and Filter dropdown, table layout & rows
  {
    search: `  return (
    <div className="space-y-6">
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Search className="w-4.5 h-4.5" /></span>
            <input 
              type="text"
              placeholder="Search category or client name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white text-gray-700"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-[7px] transition-colors shadow-premium flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5 mr-1.5" /> Add Project
        </button>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Project Name</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Category</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Tech Stack</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Client</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Show on Website</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map(proj => (
                  <tr key={proj.id} className="table-row">
                    <td className="px-6 py-4 font-bold text-gray-800 text-sm">{proj.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{proj.category}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {proj.tech_stack.split('+').map(t => (
                          <span key={t} className="px-2 py-0.5 bg-[#F4F4F5] text-[#71717A] rounded text-[10px] font-semibold tracking-wide uppercase border border-zinc-200">{t.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{proj.client}</td>
                    <td className="px-6 py-4">
                      {proj.visible ? (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#0A0A0A] text-white border border-[#0A0A0A]/10">
                          Live on Site
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#F4F4F5] text-[#71717A] border border-[#71717A]/15">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-1">
                      {/* Quick Toggle Action Eye */}
                      <button 
                        onClick={() => toggleVisibility(proj.id)}
                        className={\`p-1.5 rounded-md hover:bg-gray-50 transition-colors \${proj.visible ? 'text-[#0A0A0A]' : 'text-gray-400 hover:text-[#0A0A0A]'}\`}
                        title={proj.visible ? 'Hide from website' : 'Show on website'}
                      >
                        {proj.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleOpenEdit(proj)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] hover:bg-gray-50" title="Edit project"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(proj.id, proj.name)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Remove project"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-400">
                    No projects found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first project</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`,
    replace: `  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Portfolio</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Manage project case studies and showcase gallery visibility.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A1A1AA]"><Search className="w-4 h-4" /></span>
            <input 
              type="text"
              placeholder="Search category or client..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-[#D4D4D8] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A1A1AA] bg-white shadow-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all duration-150"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="h-10 px-3.5 border border-[#D4D4D8] rounded-lg text-sm bg-white text-[#3F3F46] focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all shadow-sm"
          >
            <option value="">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0A0A0A] hover:bg-[#2C2C2C] active:scale-[0.97] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0 stroke-[2.5]" /> Add Project
        </button>
      </div>

      {/* Portfolio Table */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Project Name</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Category</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Tech Stack</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Client</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Show on Website</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filtered.length > 0 ? (
                filtered.map(proj => (
                  <tr key={proj.id} className="table-row">
                    <td className="px-6 py-3.5 font-semibold text-[#0A0A0A] text-sm">{proj.name}</td>
                    <td className="px-6 py-3.5 text-sm text-[#71717A]">{proj.category}</td>
                    <td className="px-6 py-3.5 text-sm">
                      <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {proj.tech_stack.split('+').map(t => (
                          <span key={t} className="px-2 py-0.5 bg-[#F4F4F5] text-[#71717A] rounded text-[10px] font-semibold tracking-wide uppercase border border-zinc-200">{t.trim()}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-sm text-[#0A0A0A] font-semibold">{proj.client}</td>
                    <td className="px-6 py-3.5">
                      {proj.visible ? (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#0A0A0A] text-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                          Live on Site
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#F4F4F5] text-[#71717A] border border-[#71717A]/15 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right space-x-1">
                      {/* Quick Toggle Action Eye */}
                      <button 
                        onClick={() => toggleVisibility(proj.id)}
                        className={\`p-1.5 rounded-md hover:bg-gray-50 transition-colors active:scale-[0.97] \${proj.visible ? 'text-[#0A0A0A]' : 'text-gray-400 hover:text-[#0A0A0A]'}\`}
                        title={proj.visible ? 'Hide from website' : 'Show on website'}
                      >
                        {proj.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleOpenEdit(proj)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] active:scale-[0.97]" title="Edit project"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(proj.id, proj.name)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] transition-colors duration-150 active:scale-[0.97]" title="Remove project"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-sm text-[#71717A]">
                    No projects found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first project</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`
  },
  // 12. BlogView Page Header, Search and segmented tab filters, table layout and rows
  {
    search: `  return (
    <div className="space-y-6">
      
      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Search className="w-4.5 h-4.5" /></span>
            <input 
              type="text"
              placeholder="Search title or author..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
            />
          </div>

          <div className="flex rounded-lg border border-gray-300 overflow-hidden bg-white">
            {['', 'published', 'draft', 'pending'].map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={\`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider cursor-pointer border-r last:border-r-0 \${
                  statusFilter === tab 
                    ? 'bg-[#0A0A0A] text-white' 
                    : 'bg-white border-[#D4D4D8] text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
                }\`}
              >
                {tab === '' ? 'All' : tab}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-[7px] transition-colors shadow-premium flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5 mr-1.5" /> Add Post
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Title</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Author</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Category</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Published Date</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Publish to Site</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map(post => {
                  const isPublishedStatus = post.status === 'published';
                  return (
                    <tr key={post.id} className="table-row">
                      <td className="px-6 py-4 font-bold text-gray-800 text-sm">
                        <div>{post.title}</div>
                        {post.publishedToSite && isPublishedStatus && (
                          <span className={\`inline-flex mt-1 items-center px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider \${displayBadge.live}\`}>
                            Live on Site
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{post.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{post.published_at || <span className="text-gray-300">—</span>}</td>
                      <td className="px-6 py-4">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${badge[post.status]}\`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <ToggleSwitch 
                          checked={post.publishedToSite && isPublishedStatus}
                          onChange={() => togglePublish(post.id)}
                          disabled={!isPublishedStatus}
                          tooltip="Set status to Published first"
                          onClickDisabled={() => addToast('Set status to Published first', 'error')}
                        />
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(post)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] hover:bg-gray-50" title="Edit post"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(post.id, post.title)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Delete post"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No articles found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first article</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`,
    replace: `  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Blog Posts</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Write, edit, and publish technology articles to the website.</p>
      </div>

      {/* Search & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A1A1AA]"><Search className="w-4 h-4" /></span>
            <input 
              type="text"
              placeholder="Search title or author..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-[#D4D4D8] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A1A1AA] bg-white shadow-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all duration-150"
            />
          </div>

          <div className="flex border border-[#E4E4E7] rounded-lg overflow-hidden bg-white shadow-sm">
            {['', 'published', 'draft', 'pending'].map((tab, idx) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={\`px-4 py-2 text-xs font-bold uppercase transition-all duration-150 cursor-pointer \${
                  idx > 0 ? 'border-l border-[#E4E4E7]' : ''
                } \${
                  statusFilter === tab 
                    ? 'bg-[#0A0A0A] text-white' 
                    : 'bg-white text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
                }\`}
              >
                {tab === '' ? 'All' : tab}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0A0A0A] hover:bg-[#2C2C2C] active:scale-[0.97] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0 stroke-[2.5]" /> Add Post
        </button>
      </div>

      {/* Blogs Table */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Title</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Author</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Category</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Published Date</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Publish to Site</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filtered.length > 0 ? (
                filtered.map(post => {
                  const isPublishedStatus = post.status === 'published';
                  return (
                    <tr key={post.id} className="table-row">
                      <td className="px-6 py-3.5 font-semibold text-[#0A0A0A] text-sm">
                        <div>{post.title}</div>
                        {post.publishedToSite && isPublishedStatus && (
                          <span className={\`inline-flex mt-1.5 items-center px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${displayBadge.live}\`}>
                            Live on Site
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[#3F3F46]">{post.author}</td>
                      <td className="px-6 py-3.5 text-sm text-[#71717A]">{post.category}</td>
                      <td className="px-6 py-3.5 text-sm text-[#71717A]">{post.published_at || <span className="text-gray-300">—</span>}</td>
                      <td className="px-6 py-3.5">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${badge[post.status]}\`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <ToggleSwitch 
                          checked={post.publishedToSite && isPublishedStatus}
                          onChange={() => togglePublish(post.id)}
                          disabled={!isPublishedStatus}
                          tooltip="Set status to Published first"
                          onClickDisabled={() => addToast('Set status to Published first', 'error')}
                        />
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(post)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] active:scale-[0.97]" title="Edit post"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(post.id, post.title)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] transition-colors duration-150 active:scale-[0.97]" title="Delete post"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-[#71717A]">
                    No articles found matching criteria. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first article</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`
  },
  // 13. TeamView Page Header, Search and Action bar, Table layout & rows
  {
    search: `  return (
    <div className="space-y-6">
      
      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Search className="w-4.5 h-4.5" /></span>
          <input 
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-[7px] transition-colors shadow-premium flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5 mr-1.5" /> Add Member
        </button>
      </div>

      {/* Directory table */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Name</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Role</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Department</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Email</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Show on Website</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map(member => {
                  const isActive = member.status === 'active';
                  return (
                    <tr key={member.id} className="table-row">
                      <td className="px-6 py-4 font-bold text-gray-800 text-sm">{member.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{member.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{member.email}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={member.publishedToSite && isActive}
                            onChange={() => toggleTeamPublish(member.id)}
                            disabled={!isActive}
                            tooltip="Member is inactive"
                            onClickDisabled={() => addToast('Member is inactive', 'error')}
                          />
                          <span className={\`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider \${
                            member.publishedToSite && isActive ? displayBadge.visible : displayBadge.hidden
                          }\`}>
                            {member.publishedToSite && isActive ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${badge[member.status]}\`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(member)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] hover:bg-gray-50" title="Edit member"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(member.id, member.name)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Remove member"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No team members found. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first member</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`,
    replace: `  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Team Members</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Manage corporate hierarchy and website display visibility.</p>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A1A1AA]"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-[#D4D4D8] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A1A1AA] bg-white shadow-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all duration-150"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0A0A0A] hover:bg-[#2C2C2C] active:scale-[0.97] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0 stroke-[2.5]" /> Add Member
        </button>
      </div>

      {/* Directory table */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Name</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Role</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Department</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Email</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Show on Website</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filtered.length > 0 ? (
                filtered.map(member => {
                  const isActive = member.status === 'active';
                  return (
                    <tr key={member.id} className="table-row">
                      <td className="px-6 py-3.5 font-semibold text-[#0A0A0A] text-sm">{member.name}</td>
                      <td className="px-6 py-3.5 text-sm text-[#3F3F46]">{member.role}</td>
                      <td className="px-6 py-3.5 text-sm text-[#71717A]">{member.department}</td>
                      <td className="px-6 py-3.5 text-sm text-[#71717A]">{member.email}</td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={member.publishedToSite && isActive}
                            onChange={() => toggleTeamPublish(member.id)}
                            disabled={!isActive}
                            tooltip="Member is inactive"
                            onClickDisabled={() => addToast('Member is inactive', 'error')}
                          />
                          <span className={\`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${
                            member.publishedToSite && isActive ? displayBadge.visible : displayBadge.hidden
                          }\`}>
                            {member.publishedToSite && isActive ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${badge[member.status]}\`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(member)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] active:scale-[0.97]" title="Edit member"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(member.id, member.name)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] transition-colors duration-150 active:scale-[0.97]" title="Remove member"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-[#71717A]">
                    No team members found. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first member</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`
  },
  // 14. CareersView Page Header, Search and Action bar, Table layout & rows
  {
    search: `  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Search className="w-4.5 h-4.5" /></span>
          <input 
            type="text"
            placeholder="Search positions or departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#0A0A0A] focus:border-[#0A0A0A]"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded-[7px] transition-colors shadow-premium flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-4.5 h-4.5 mr-1.5" /> Add Job
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white rounded-lg border border-[#E4E4E7] shadow-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]">
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Position</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Department</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Type</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Applicants</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em]">Website</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.length > 0 ? (
                filtered.map(job => {
                  const isAllowed = job.status === 'open' || job.status === 'review';
                  return (
                    <tr key={job.id} className="table-row">
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-gray-800">
                          <div>{job.position}</div>
                          {job.status === 'draft' && (
                            <div className="text-[10px] text-[#71717A] font-semibold mt-1">Change status to Open first</div>
                          )}
                        </div>
                        {job.description && (
                          <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{job.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{job.department}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{formatType(job.type)}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{job.applicants}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${statusBadge[job.status]}\`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={job.publishedToSite && isAllowed}
                            onChange={() => toggleJobPublish(job.id)}
                            disabled={false}
                            onClickDisabled={null}
                          />
                          <span className={\`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider \${
                            job.publishedToSite && isAllowed ? websiteBadge.live : websiteBadge.notListed
                          }\`}>
                            {job.publishedToSite && isAllowed ? 'Live' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(job)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] hover:bg-gray-50" title="Edit job"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(job.id, job.position)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Remove job"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No jobs found. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first job</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`,
    replace: `  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Careers</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Post, update, and manage job openings and list applicants.</p>
      </div>

      {/* Search & Action */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#A1A1AA]"><Search className="w-4 h-4" /></span>
          <input 
            type="text"
            placeholder="Search positions or departments..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 border border-[#D4D4D8] rounded-lg text-sm text-[#0A0A0A] placeholder-[#A1A1AA] bg-white shadow-sm focus:outline-none focus:border-[#0A0A0A] focus:ring-2 focus:ring-black/5 transition-all duration-150"
          />
        </div>

        <button 
          onClick={handleOpenAdd}
          className="h-10 px-5 bg-[#0A0A0A] hover:bg-[#2C2C2C] active:scale-[0.97] text-white text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center cursor-pointer font-sans"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0 stroke-[2.5]" /> Add Job
        </button>
      </div>

      {/* Careers Table */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-container">
            <thead>
              <tr className="border-b border-[#E4E4E7] text-left bg-[#FAFAFA]/50">
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Position</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Department</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Type</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Applicants</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em]">Website</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filtered.length > 0 ? (
                filtered.map(job => {
                  const isAllowed = job.status === 'open' || job.status === 'review';
                  return (
                    <tr key={job.id} className="table-row">
                      <td className="px-6 py-3.5">
                        <div className="text-sm font-semibold text-[#0A0A0A]">
                          <div>{job.position}</div>
                          {job.status === 'draft' && (
                            <div className="text-[10px] text-[#71717A] font-semibold mt-1">Change status to Open first</div>
                          )}
                        </div>
                        {job.description && (
                          <div className="text-xs text-[#71717A] line-clamp-1 mt-0.5">{job.description}</div>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[#71717A]">{job.department}</td>
                      <td className="px-6 py-3.5 text-sm text-[#3F3F46] font-semibold">{formatType(job.type)}</td>
                      <td className="px-6 py-3.5 text-sm text-[#3F3F46]">
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-[#71717A]" />
                          <span>{job.applicants}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span className={\`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${statusBadge[job.status]}\`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <ToggleSwitch 
                            checked={job.publishedToSite && isAllowed}
                            onChange={() => toggleJobPublish(job.id)}
                            disabled={false}
                            onClickDisabled={null}
                          />
                          <span className={\`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${
                            job.publishedToSite && isAllowed ? websiteBadge.live : websiteBadge.notListed
                          }\`}>
                            {job.publishedToSite && isAllowed ? 'Live' : 'Hidden'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(job)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] active:scale-[0.97]" title="Edit job"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(job.id, job.position)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] transition-colors duration-150 active:scale-[0.97]" title="Remove job"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-[#71717A]">
                    No jobs found. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Add your first job</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`
  },
  // 15. AnalyticsView segmented control, page header, metrics hover, taller bar chart and gaps
  {
    search: `function AnalyticsView() {
  const [dateRange, setDateRange] = useState('this_month');

  // Variations in traffic aggregates based on selected date ranges
  const variations = {
    this_week: { views: '2,840', visitors: '950', time: '1m 58s', rate: '3.9%', data: [1100, 750, 480, 290, 150, 70] },
    this_month: { views: '11,920', visitors: '3,100', time: '2m 45s', rate: '4.2%', data: [4200, 2800, 1900, 1400, 980, 640] },
    last_3_months: { views: '39,400', visitors: '10,800', time: '3m 12s', rate: '4.5%', data: [15400, 9800, 6200, 4100, 2400, 1500] }
  };

  const activeVar = variations[dateRange];

  const pages = [
    { path: '/', label: 'Home Page' },
    { path: '/services', label: 'Services Portal' },
    { path: '/portfolio', label: 'Portfolio Gallery' },
    { path: '/blog', label: 'Tech Blog' },
    { path: '/contact', label: 'Contact Inquiries' },
    { path: '/careers', label: 'Careers Listings' }
  ];

  const maxViews = Math.max(...activeVar.data);

  return (
    <div className="space-y-6">
      
      {/* Date Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border-0.5 border-gray-200 shadow-premium font-sans">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium">Reporting Window Settings</span>
        </div>
        
        <div className="flex rounded-lg border border-gray-300 overflow-hidden bg-white">
          {[
            { id: 'this_week', name: 'This Week' },
            { id: 'this_month', name: 'This Month' },
            { id: 'last_3_months', name: 'Last 3 Months' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setDateRange(btn.id)}
              className={\`px-3 py-1.5 text-xs font-semibold cursor-pointer border-r last:border-r-0 \${
                dateRange === btn.id 
                  ? 'bg-[#0A0A0A] text-white' 
                  : 'bg-white border-[#D4D4D8] text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
              }\`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
        
        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Page Views</span>
            <span className="text-2xl font-bold text-[#0A0A0A] block">{activeVar.views}</span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Eye className="w-4.5 h-4.5" /></div>
        </div>

        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Unique Visitors</span>
            <span className="text-2xl font-bold text-[#0A0A0A] block">{activeVar.visitors}</span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Users className="w-4.5 h-4.5" /></div>
        </div>

        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Avg. Time on Site</span>
            <span className="text-2xl font-bold text-[#0A0A0A] block">{activeVar.time}</span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Clock className="w-4.5 h-4.5" /></div>
        </div>

        <div className="bg-white p-5 rounded-[10px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-[#71717A] uppercase tracking-[0.08em] block">Lead Conversion Rate</span>
            <span className="text-2xl font-bold text-[#0A0A0A] block">{activeVar.rate}</span>
          </div>
          <div className="p-2 bg-[#F4F4F5] text-[#0A0A0A] rounded-full flex items-center justify-center"><Percent className="w-4.5 h-4.5" /></div>
        </div>

      </div>

      {/* Pages traffic list */}
      <div className="bg-white rounded-[10px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 font-sans">
        <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider mb-5">Top Pages Performance</h3>
        
        <div className="space-y-4">
          {pages.map((page, index) => {
            const count = activeVar.data[index];
            const percent = (count / maxViews) * 100;
            return (
              <div key={page.path} className="flex items-center space-x-4">
                <div className="w-36 sm:w-44 text-xs font-bold text-gray-700 truncate">{page.path} <span className="text-gray-400 font-medium text-[10px] ml-1">({page.label})</span></div>
                <div className="flex-1">
                  <div className="w-full bg-[#F4F4F5] h-6 rounded-md overflow-hidden relative flex items-center">
                    <div className="bg-[#F4F4F5] h-full border-r-2 border-[#0A0A0A]/25 transition-all duration-300" style={{ width: \`\${percent}%\` }} />
                    <span className="absolute left-2.5 text-[10px] font-bold text-[#0A0A0A]">
                      {count.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>`,
    replace: `function AnalyticsView() {
  const [dateRange, setDateRange] = useState('this_month');

  // Variations in traffic aggregates based on selected date ranges
  const variations = {
    this_week: { views: '2,840', visitors: '950', time: '1m 58s', rate: '3.9%', data: [1100, 750, 480, 290, 150, 70] },
    this_month: { views: '11,920', visitors: '3,100', time: '2m 45s', rate: '4.2%', data: [4200, 2800, 1900, 1400, 980, 640] },
    last_3_months: { views: '39,400', visitors: '10,800', time: '3m 12s', rate: '4.5%', data: [15400, 9800, 6200, 4100, 2400, 1500] }
  };

  const activeVar = variations[dateRange];

  const pages = [
    { path: '/', label: 'Home Page' },
    { path: '/services', label: 'Services Portal' },
    { path: '/portfolio', label: 'Portfolio Gallery' },
    { path: '/blog', label: 'Tech Blog' },
    { path: '/contact', label: 'Contact Inquiries' },
    { path: '/careers', label: 'Careers Listings' }
  ];

  const maxViews = Math.max(...activeVar.data);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="pb-5 border-b border-[#E4E4E7]">
        <h1 className="text-[24px] font-extrabold text-[#0A0A0A] tracking-tight">Analytics</h1>
        <p className="text-[13px] text-[#71717A] mt-1">Monitor site traffic, views, unique visitors and conversion metrics.</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm font-sans">
        <div className="flex items-center text-gray-650">
          <Calendar className="w-5 h-5 text-gray-400 mr-2" />
          <span className="text-sm font-medium">Reporting Window Settings</span>
        </div>
        
        <div className="flex border border-[#E4E4E7] rounded-lg overflow-hidden bg-white shadow-sm">
          {[
            { id: 'this_week', name: 'This Week' },
            { id: 'this_month', name: 'This Month' },
            { id: 'last_3_months', name: 'Last 3 Months' }
          ].map((btn, idx) => (
            <button
              key={btn.id}
              onClick={() => setDateRange(btn.id)}
              className={\`px-4 py-2 text-xs font-bold transition-all duration-150 cursor-pointer \${
                idx > 0 ? 'border-l border-[#E4E4E7]' : ''
              } \${
                dateRange === btn.id 
                  ? 'bg-[#0A0A0A] text-white' 
                  : 'bg-white text-[#71717A] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
              }\`}
            >
              {btn.name}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 font-sans">
        
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Page Views</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight block leading-none">{activeVar.views}</span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Eye className="w-5 h-5" /></div>
        </div>

        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Unique Visitors</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight block leading-none">{activeVar.visitors}</span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Users className="w-5 h-5" /></div>
        </div>

        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Avg. Time on Site</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight block leading-none">{activeVar.time}</span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Clock className="w-5 h-5" /></div>
        </div>

        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Lead Conversion Rate</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight block leading-none">{activeVar.rate}</span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Percent className="w-5 h-5" /></div>
        </div>

      </div>

      {/* Pages traffic list */}
      <div className="bg-white rounded-[14px] border border-[#E4E4E7] shadow-[0_1px_3px_rgba(0,0,0,0.06)] p-6 font-sans">
        <h3 className="font-bold text-[#0A0A0A] text-sm uppercase tracking-wider mb-6">Top Pages Performance</h3>
        
        <div className="space-y-6">
          {pages.map((page, index) => {
            const count = activeVar.data[index];
            const percent = (count / maxViews) * 100;
            return (
              <div key={page.path} className="flex items-center space-x-4">
                <div className="w-36 sm:w-44 text-xs font-bold text-gray-700 truncate">{page.path} <span className="text-gray-400 font-medium text-[10px] ml-1">({page.label})</span></div>
                <div className="flex-1">
                  <div className="w-full bg-[#F4F4F5] h-8 rounded-lg overflow-hidden relative flex items-center shadow-inner">
                    <div className="bg-[#F4F4F5] h-full border-r-[3px] border-[#0A0A0A]/30 transition-all duration-300 relative bar-shimmer" style={{ width: \`\${percent}%\` }} />
                    <span className="absolute left-3.5 text-[11px] font-extrabold text-[#0A0A0A] tracking-wide">
                      {count.toLocaleString()} views
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>`
  }
];

let count = 0;
for (let item of replacements) {
  const normSearch = item.search.replace(/\r\n/g, '\n');
  const normReplace = item.replace.replace(/\r\n/g, '\n');
  if (content.includes(normSearch)) {
    content = content.replace(normSearch, normReplace);
    console.log(`Successfully replaced: "${item.search.substring(0, 40).replace(/\n/g, ' ')}..."`);
    count++;
  } else {
    console.warn(`WARNING: Search target not found for: "${item.search.substring(0, 40).replace(/\n/g, ' ')}..."`);
  }
}

fs.writeFileSync(appPath, content, 'utf8');
console.log(`Finished processing: ${count} replacements out of ${replacements.length} items.`);
