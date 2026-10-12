// js/certificates/config.js — which courses issue a certificate, and what counts as complete.
// One entry per course; js/certificate.js reads this and has no course-specific code.
//   requiredIds : progress ids (users/{uid}/progress/{courseId}__{id}) that must be completed
//   rule        : 'all-completed' (every required id has completed:true)
//   prefix      : used in the certificate ID, e.g. CE-GENAI-2026-K7M2QP
//   landing     : course page, relative to the site root (/courses/)

import { UNITS } from '../curriculum/genai.js';

export const CERT_COURSES = {
  genai: {
    courseId:    'genai',
    title:       'Generative AI: Zero to Job-Ready',
    track:       'Professional',
    prefix:      'GENAI',
    requiredIds: UNITS.flatMap(u => u.modules.map(m => m.id)),
    rule:        'all-completed',
    landing:     'professional/genai/'
  },

  // Added later, once each course's prerequisites exist (see HANDOFF_CERTIFICATES_GENAI.md):
  // 'ai-tools': { courseId:'ai-tools', title:'AI Tools for Everyday Work', track:'Professional', prefix:'AITOOLS',
  //               requiredIds: /* the learner's path + the My AI Work Kit final project */, rule:'all-completed', landing:'professional/ai-tools/' },
  // 'coa':      { courseId:'coa', title:'Computer Organization and Architecture', track:'Academic', prefix:'COA',
  //               requiredIds: /* every topic id across js/curriculum/coa-unit1..5.js */, rule:'all-completed', landing:'academic/coa/' },
  // 'dld':      { courseId:'dld', title:'Digital Logic Design', track:'Academic', prefix:'DLD',
  //               requiredIds: /* every topic id across js/curriculum/dld-unit1..5.js */, rule:'all-completed', landing:'academic/dld/' },
};

export const SITE_ORIGIN = 'https://chandrashaker.com/courses';
