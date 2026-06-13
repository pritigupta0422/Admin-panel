import os

app_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/App.jsx'))

with open(app_path, 'r', encoding='utf-8') as f:
    content = f.read().replace('\r\n', '\n')

old_sidebar_code = """  const SidebarContent = () => (
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
                    className={`group flex items-center h-10 px-4 mx-3 rounded-lg border-l-2 text-sm font-medium transition-all duration-150 ease-in-out ${
                      isActive 
                        ? 'border-white text-white bg-[#1A1A1A] font-semibold shadow-[inset_0_0_20px_rgba(255,255,255,0.03)]' 
                        : 'border-transparent text-[#A1A1AA] hover:text-white hover:bg-[#1A1A1A]'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] mr-3 transition-transform duration-150 group-hover:translate-x-[2px] ${isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
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
  );"""

new_sidebar_code = """  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#FFFFFF] text-[#3F3F46] border-r border-[#E4E4E7]">
      
      {/* Sidebar logo box (white container housing logo.jpeg) */}
      <div className="bg-white p-6 flex justify-center items-center shrink-0">
        <img 
          src="/logo.jpeg" 
          alt="Nexix Technology" 
          className="w-[140px] h-auto object-contain" 
        />
      </div>
      <div className="h-px bg-[#E4E4E7] w-full shrink-0" />

      <nav className="flex-1 overflow-y-auto py-6 space-y-6">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-1">
            <span className="px-7 text-[10px] font-bold text-[#A1A1AA] uppercase tracking-[0.12em] block mb-2 mt-6 first:mt-0">
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
                    className={`group flex items-center h-10 px-4 mx-3 rounded-lg border-l-2 text-sm font-medium transition-all duration-150 ease-in-out ${
                      isActive 
                        ? 'border-[#0A0A0A] text-[#0A0A0A] bg-[#F4F4F5] font-semibold' 
                        : 'border-transparent text-[#3F3F46] hover:text-[#0A0A0A] hover:bg-[#F4F4F5]'
                    }`}
                  >
                    <Icon className={`w-[18px] h-[18px] mr-3 transition-transform duration-150 group-hover:translate-x-[2px] ${isActive ? 'text-[#0A0A0A]' : 'text-[#71717A] group-hover:text-[#0A0A0A]'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar bottom footer (with EKG pulse SVG) */}
      <div className="p-4 border-t border-[#E4E4E7] bg-[#FFFFFF] flex flex-col space-y-3.5 shrink-0">
        <div className="flex justify-center">
          <svg width="80" height="16" viewBox="0 0 80 16" fill="none" className="select-none">
            <path 
              d="M0 8H25L29 4L33 12L37 2L41 14L45 6L49 10L53 8H80" 
              stroke="#D4D4D8" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
        <div className="flex items-center space-x-2 px-1">
          <div className="w-7 h-7 rounded-full bg-[#0A0A0A] text-white text-[10px] font-bold flex items-center justify-center shadow-inner select-none shrink-0">
            NA
          </div>
          <div className="text-[10px] text-[#71717A] font-mono tracking-tight truncate flex-1">
            {user?.email || 'admin@nexix.tech'}
          </div>
        </div>
      </div>
    </div>
  );"""

if old_sidebar_code in content:
    content = content.replace(old_sidebar_code, new_sidebar_code)
    with open(app_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("SUCCESS: Sidebar overhauled to light theme.")
else:
    print("FAILED: Could not find exact SidebarContent block in App.jsx.")
    # Print a small part of the sidebar code in content to debug
    idx = content.find('const SidebarContent = () => (')
    if idx != -1:
        print("Found start marker, printing local content:")
        print(content[idx:idx+300])
    exit(1)
