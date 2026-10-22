// js/quiz-submit.js — quiz behaviour for the COA, DLD and AI Tools topic pages.
// A topic is complete only when its quiz is passed. On a fail nothing is written and the
// learner sees the score with a "Try again" button; on a pass the best score is kept.
// Usage (page script, after the QUIZ array):
//   initTopicQuiz({ courseId:COURSE_ID, topicId:TOPIC_ID, questions:QUIZ, passPct:60, noun:'topic' });
//   passPct: 60 for COA and DLD, 70 for AI Tools (5 questions → 3/5 and 4/5)
// Question text is trusted HTML (see js/quiz.js). Needs #quiz-section, #quiz-body, #submit-btn,
// #quiz-result and #retry-btn on the page.

import { initQuiz } from './quiz.js';

export function initTopicQuiz({ courseId, topicId, questions, passPct, noun = 'topic' }) {
  const passMark = Math.ceil(passPct * questions.length / 100);
  initQuiz({
    courseId, moduleId: topicId, passMark, questions,
    messages: {
      pass: `Passed — this ${noun} is marked complete.`,
      fail: (score, total, need) => `You scored ${score} / ${total} — ${need} needed to pass.`
    }
  });
}
