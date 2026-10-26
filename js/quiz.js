// js/quiz.js — gate + 5-question quiz with a real pass mark (GenAI sub-modules)
// Usage (page script):
//   initQuiz({ courseId:'genai', moduleId:MODULE_ID, passMark:4, questions:QUIZ });
// Optional: messages:{ pass:string, fail:(score,total,passMark)=>string } to change the result wording
// (js/quiz-submit.js uses this for the academic and AI Tools topic pages).
// Questions: [{ q, options:[4 strings], answer:<index 0-3>, explanation }]
// Question text is trusted HTML (injected as-is); write < as &lt; and & as &amp;.

import { onAuth, getProgress, saveQuizResult } from './firebase-config.js';

const LABELS = ['A', 'B', 'C', 'D'];
const DEFAULT_IDS = {
  gate: 'gate-section', quiz: 'quiz-section', body: 'quiz-body',
  submit: 'submit-btn', result: 'quiz-result', retry: 'retry-btn'
};

const DEFAULT_MESSAGES = {
  pass: 'Passed — this sub-module is marked complete.',
  fail: (score, total, passMark) => `You need ${passMark}/${total} to pass. Review the lesson and try again.`
};

export function initQuiz({ courseId, moduleId, passMark, questions, rootIds = {}, messages = {} }) {
  const ids = { ...DEFAULT_IDS, ...rootIds };
  const msg = { ...DEFAULT_MESSAGES, ...messages };
  const $ = key => document.getElementById(ids[key]);
  let selected = {}, submitted = false, uid = null;

  function buildQuiz() {
    selected = {}; submitted = false;
    $('result').style.display = 'none';
    $('retry').style.display  = 'none';
    $('submit').style.display = '';
    $('submit').disabled      = true;
    $('body').innerHTML = questions.map((q, qi) => `
      <div class="question">
        <div class="question-text">Q${qi + 1}. ${q.q}</div>
        <div class="options">${q.options.map((o, oi) =>
          `<div class="option" data-qi="${qi}" data-oi="${oi}"><span class="option-lbl">${LABELS[oi]}</span><span class="option-text">${o}</span></div>`).join('')}</div>
        <div class="explanation" id="exp${qi}" style="display:none">💡 ${q.explanation}</div>
      </div>`).join('');
    $('body').querySelectorAll('.option').forEach(el => {
      el.onclick = () => {
        if (submitted) return;
        const qi = +el.dataset.qi;
        selected[qi] = +el.dataset.oi;
        $('body').querySelectorAll(`[data-qi="${qi}"]`).forEach(o => o.classList.remove('selected'));
        el.classList.add('selected');
        $('submit').disabled = Object.keys(selected).length < questions.length;
      };
    });
  }

  async function submitQuiz() {
    submitted = true;
    let score = 0;
    questions.forEach((q, qi) => {
      $('body').querySelectorAll(`[data-qi="${qi}"]`).forEach(o => {
        if (+o.dataset.oi === q.answer) o.classList.add('correct');
        else if (+o.dataset.oi === selected[qi]) o.classList.add('wrong');
      });
      document.getElementById(`exp${qi}`).style.display = 'block';
      if (selected[qi] === q.answer) score++;
    });
    $('submit').style.display = 'none';
    const pass = score >= passMark, res = $('result');
    res.style.display = 'block';
    res.className = `quiz-result ${pass ? 'pass' : 'fail'}`;
    res.innerHTML = `<div class="quiz-score">${pass ? '🎉' : '📖'} Score: ${score}/${questions.length}</div>
      <div class="quiz-msg">${pass ? msg.pass : msg.fail(score, questions.length, passMark)}</div>`;
    $('retry').style.display = 'inline-block';
    await saveQuizResult(uid, courseId, moduleId, score, questions.length, passMark);
  }

  onAuth(async user => {
    if (!user) return;                       // logged out: the gate stays visible
    uid = user.uid;
    $('gate').style.display = 'none';
    $('quiz').style.display = 'block';
    buildQuiz();
    $('submit').onclick = submitQuiz;
    $('retry').onclick  = buildQuiz;
    const prog = await getProgress(uid, courseId, moduleId);
    if (prog?.completed && !submitted) {
      const res = $('result');
      res.style.display = 'block';
      res.className = 'quiz-result pass';
      res.innerHTML = `<div class="quiz-score">✅ Completed${prog.score != null ? ` — Best score: ${prog.score}/${prog.total}` : ''}</div>
        <div class="quiz-msg">You can retake the quiz anytime.</div>`;
    }
  });
}
