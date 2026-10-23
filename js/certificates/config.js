// js/certificates/config.js — which courses issue a certificate, and what counts as complete.
// One entry per course; js/certificate.js reads this and has no course-specific code.
//   requiredIds : progress ids (users/{uid}/progress/{courseId}__{id}) that must be completed
//   rule        : 'all-completed' (every required id has completed:true)
//   passPct     : a required id that stores a quiz score must have percent >= passPct (80 = 4/5, 60 = 3/5);
//                 ids with no stored score (the GenAI Final Project) count as soon as they are completed
//   prefix      : used in the certificate ID, e.g. CE-GENAI-2026-K7M2QP
//   landing     : course page, relative to the site root (/courses/)

import { UNITS } from '../curriculum/genai.js';
import { GROUPS as COA1 } from '../curriculum/coa-unit1.js';
import { GROUPS as COA2 } from '../curriculum/coa-unit2.js';
import { GROUPS as COA3 } from '../curriculum/coa-unit3.js';
import { GROUPS as COA4 } from '../curriculum/coa-unit4.js';
import { GROUPS as COA5 } from '../curriculum/coa-unit5.js';

export const CERT_COURSES = {
  genai: {
    courseId:    'genai',
    title:       'Generative AI: Zero to Job-Ready',
    track:       'Professional',
    prefix:      'GENAI',
    requiredIds: UNITS.flatMap(u => u.modules.map(m => m.id)),
    rule:        'all-completed',
    passPct:     80,
    landing:     'professional/genai/'
  },

  coa: {
    courseId:    'coa',
    title:       'Computer Organization and Architecture',
    track:       'Academic',
    prefix:      'COA',
    // every topic id across the five unit curriculum files (69), in course order
    requiredIds: [COA1, COA2, COA3, COA4, COA5].flatMap(g => Object.values(g).flat().map(t => t.id)),
    rule:        'all-completed',
    passPct:     60,
    landing:     'academic/coa/'
  },

  // Added later, once each course's prerequisites exist:
  // 'ai-tools': { courseId:'ai-tools', title:'AI Tools for Everyday Work', track:'Professional', prefix:'AITOOLS',
  //               requiredIds: /* the learner's path + the My AI Work Kit final project */, rule:'all-completed', landing:'professional/ai-tools/' },
  // 'dld':      { courseId:'dld', title:'Digital Logic Design', track:'Academic', prefix:'DLD',
  //               requiredIds: /* every topic id across js/curriculum/dld-unit1..5.js */, rule:'all-completed', landing:'academic/dld/' },
};

export const SITE_ORIGIN = 'https://chandrashaker.com/courses';
