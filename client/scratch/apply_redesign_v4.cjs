const fs = require('fs');
const path = require('path');

const appPath = path.resolve(__dirname, '../src/App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Normalize line endings to LF to ensure exact matches
content = content.replace(/\r\n/g, '\n');

// 1. Target CareersView return block
const careersViewOld = `  return (
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
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider \${statusBadge[job.status]}\`}>
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
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider \${
                            job.publishedToSite && isAllowed ? websiteBadge.live : websiteBadge.notListed
                          }\`}>
                            {job.publishedToSite && isAllowed ? 'Live on Site' : 'Not Listed'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(job)} className="p-1.5 rounded-md text-gray-400 hover:text-[#0A0A0A] hover:bg-gray-50" title="Edit opening"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(job.id, job.position)} className="p-1.5 rounded-md text-[#71717A] hover:text-[#0A0A0A] transition-colors duration-150" title="Remove opening"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No open career listings. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Post first position</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`;

const careersViewNew = `  return (
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
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${statusBadge[job.status]}\`}>
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
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider shadow-[0_1px_2px_rgba(0,0,0,0.06)] \${
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
                    No open career listings. <button onClick={handleOpenAdd} className="text-[#0A0A0A] font-semibold underline">Post first position</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>`;

// 2. Metric Cards search & replace
const metricsOld = `      {/* 4 Metric Cards Grid (with left borders and top-right icons) */}
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
      </div>`;

const metricsNew = `      {/* 4 Metric Cards Grid (with left borders and top-right icons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Leads Card */}
        <div className="metric-card-bg p-6 rounded-[14px] border-y border-r border-[#E4E4E7] border-l-[3px] border-l-[#0A0A0A] shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex items-start justify-between relative transition-all duration-200 ease-out transform hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className="h-full flex flex-col justify-between">
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
          <div className="h-full flex flex-col justify-between">
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
          <div className="h-full flex flex-col justify-between">
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
          <div className="h-full flex flex-col justify-between">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.12em] block">Team Members</span>
            <span className="text-[36px] font-extrabold text-[#0A0A0A] tracking-tight mt-1 block leading-none">{totalTeam}</span>
            <span className="text-[13px] text-[#71717A] block mt-2 font-normal">
              ● {activeTeam} active
            </span>
          </div>
          <div className="w-11 h-11 bg-[#F4F4F5] text-[#0A0A0A] rounded-[10px] flex items-center justify-center shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] shrink-0"><Users className="w-5 h-5" /></div>
        </div>
      </div>`;

// Normalizations to handle whitespace correctly
const normCareersOld = careersViewOld.trim().replace(/\s+/g, ' ');
const normMetricsOld = metricsOld.trim().replace(/\s+/g, ' ');

// Find blocks by normalized whitespace matching
function replaceBlock(source, targetNorm, replacement) {
  let tempSource = source.replace(/\r\n/g, '\n');
  
  // Find where it matches
  let index = -1;
  const sourceNorms = [];
  
  // We can search line by line, or with simple spacing match
  // Let's do a sliding window search or regex match
  // A simple way is to find a unique start substring, find unique end substring, and verify
  return { success: false, content: source };
}

// Let's implement a clean exact match replace. If the direct index.html / App.jsx string doesn't match perfectly, we can do direct replacements.
let replacedCareers = false;
let replacedMetrics = false;

if (content.includes(careersViewOld.replace(/\r\n/g, '\n'))) {
  content = content.replace(careersViewOld.replace(/\r\n/g, '\n'), careersViewNew);
  replacedCareers = true;
  console.log("SUCCESS: Replaced CareersView.");
} else {
  console.log("WARNING: Could not find exact CareersView old block.");
}

if (content.includes(metricsOld.replace(/\r\n/g, '\n'))) {
  content = content.replace(metricsOld.replace(/\r\n/g, '\n'), metricsNew);
  replacedMetrics = true;
  console.log("SUCCESS: Replaced Metrics.");
} else {
  console.log("WARNING: Could not find exact Metrics old block.");
}

// Fallback search using start/end markers if exact match fails
if (!replacedCareers) {
  const startMarker = 'function CareersView() {';
  const startIndex = content.indexOf(startMarker);
  if (startIndex !== -1) {
    const returnMarker = 'return (';
    const returnIndex = content.indexOf(returnMarker, startIndex);
    
    // Find the next table closing element
    const endTableMarker = '      {/* FORM MODAL */}';
    const endTableIndex = content.indexOf(endTableMarker, returnIndex);
    
    if (returnIndex !== -1 && endTableIndex !== -1) {
      // Find the end of the return statement before FORM MODAL
      // The return statement ends with a closing paren/semicolon/newline.
      const snippetToReplace = content.substring(returnIndex, endTableIndex);
      // Let's verify snippet contains "Careers Table"
      if (snippetToReplace.includes('Careers Table')) {
        content = content.substring(0, returnIndex) + careersViewNew.trim() + '\n\n' + content.substring(endTableIndex);
        replacedCareers = true;
        console.log("SUCCESS: Replaced CareersView via markers.");
      }
    }
  }
}

if (!replacedMetrics) {
  const startMarker = '      {/* 4 Metric Cards Grid';
  const startIndex = content.indexOf(startMarker);
  if (startIndex !== -1) {
    const endMarker = '      {/* Main Panels grid */}';
    const endIndex = content.indexOf(endMarker, startIndex);
    if (endIndex !== -1) {
      const snippetToReplace = content.substring(startIndex, endIndex);
      if (snippetToReplace.includes('Leads Card')) {
        content = content.substring(0, startIndex) + metricsNew + '\n\n' + content.substring(endIndex);
        replacedMetrics = true;
        console.log("SUCCESS: Replaced Metrics via markers.");
      }
    }
  }
}

if (replacedCareers && replacedMetrics) {
  fs.writeFileSync(appPath, content, 'utf8');
  console.log("Finished successfully!");
} else {
  console.error("FAIL: Could not replace all target blocks.");
  process.exit(1);
}
