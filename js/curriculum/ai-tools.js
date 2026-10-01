// js/curriculum/ai-tools.js — "AI Tools for Everyday Work" curriculum data.
// Shaped like COA/DLD's GROUPS (not GenAI's UNITS) because this course's 6
// "Parts" are sub-groups within one course, shown together in the sidebar —
// the same relationship COA/DLD's topic-groups have within a single unit.
// Modules 5-13 have no href and status:'coming' — not yet written, no
// placeholder pages exist for them (deliberate, per course brief).

export const GROUPS = {
  'part-1': [
    { id:'how-ai-tools-work', title:'How AI Tools Work, and When They Go Wrong', desc:'How an AI tool writes its answers, what it is good at, where it goes wrong, and the Traffic Light Rule.', time:'20 min', href:'how-ai-tools-work.html', status:'active' },
    { id:'how-to-ask-ai-clearly', title:'How to Ask AI Clearly', desc:'The 4 parts of a clear request, two habits that improve every answer, and ready-to-use prompt templates.', time:'27 min', href:'how-to-ask-ai-clearly.html', status:'active' },
    { id:'picking-the-right-ai-tool', title:'Picking the Right AI Tool', desc:'The 5 types of AI tools, 4 questions to pick the right one, and settings to check before you start.', time:'25 min', href:'picking-the-right-ai-tool.html', status:'active' },
    { id:'your-prompt-collection', title:'Save Time: Your Own Prompt Collection', desc:'Build your own reusable prompt collection, about-me settings and project folders.', time:'30 min', href:'your-prompt-collection.html', status:'active' },
  ],
  'part-2': [
    { id:'emails-circulars-meetings', title:'Emails, Circulars and Meetings', desc:'Draft emails, circulars and meeting minutes with AI, using your college’s own format.', time:'20 min', status:'coming' },
    { id:'excel-sheets-with-ai', title:'Excel and Google Sheets with AI', desc:'Use AI to write formulas, clean data and build simple reports in Excel or Sheets.', time:'20 min', status:'coming' },
    { id:'documents-and-presentations', title:'Documents and Presentations', desc:'Draft reports and letters, and turn an outline into slides with AI tools.', time:'20 min', status:'coming' },
  ],
  'part-3': [
    { id:'lesson-plans-learning-material', title:'Lesson Plans and Learning Material', desc:'Build lesson plans, explanations and learning material faster with AI.', time:'20 min', status:'coming' },
    { id:'question-papers-rubrics-assignments', title:'Question Papers, Rubrics and Assignments', desc:'Draft question papers, grading rubrics and assignments, and check them for fairness.', time:'20 min', status:'coming' },
    { id:'accreditation-documents', title:'Accreditation Documents', desc:'Use AI to help prepare accreditation and compliance documents.', time:'20 min', status:'coming' },
  ],
  'part-4': [
    { id:'finding-checking-information', title:'Finding and Checking Information', desc:'Use AI search and my-files tools to find information, and check it before you use it.', time:'20 min', status:'coming' },
  ],
  'part-5': [
    { id:'lab-manuals-safety-stock-scripts', title:'Lab Manuals, Safety Rules, Stock Registers and Simple Scripts', desc:'Prepare lab manual pages, safety rules, stock registers and simple scripts with AI.', time:'20 min', status:'coming' },
  ],
  'part-6': [
    { id:'privacy-facts-honest-use', title:'Privacy, Checking Facts and Honest Use', desc:'Safe and honest AI use: protecting personal data, checking facts and avoiding over-reliance.', time:'20 min', status:'coming' },
  ],
};

export const GROUP_LABELS = {
  'part-1': '🧩 The Basics',
  'part-2': '📋 Office Work',
  'part-3': '🎓 Teaching',
  'part-4': '🔍 Research',
  'part-5': '🔧 Labs',
  'part-6': '🔒 Safe Use',
};
