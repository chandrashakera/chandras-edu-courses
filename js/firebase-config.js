// js/firebase-config.js
// Shared across all pages — do not edit unless Firebase project changes

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider,
  signInWithPopup, signInWithEmailAndPassword,
  createUserWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyA9aUdyNevPAmHuI4-hae9nSx6H9vT98WI",
  authDomain:        "chandras-edu-f5d6d.firebaseapp.com",
  projectId:         "chandras-edu-f5d6d",
  storageBucket:     "chandras-edu-f5d6d.firebasestorage.app",
  messagingSenderId: "340071281792",
  appId:             "1:340071281792:web:e3a20640f682a4c1fda265"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// ── Auth ──────────────────────────────────────────────────────
export const loginGoogle  = () => signInWithPopup(auth, new GoogleAuthProvider());
export const loginEmail   = (e, p) => signInWithEmailAndPassword(auth, e, p);
export const registerEmail= (e, p) => createUserWithEmailAndPassword(auth, e, p);
export const logout       = () => signOut(auth);
export const onAuth       = (cb) => onAuthStateChanged(auth, cb);

// ── Progress ──────────────────────────────────────────────────
export async function saveProgress(uid, courseId, topicId, score, total) {
  const ref = doc(db, "users", uid, "progress", `${courseId}__${topicId}`);
  await setDoc(ref, {
    completed:   true,
    score, total,
    percent:     Math.round((score / total) * 100),
    completedAt: new Date().toISOString()
  }, { merge: true });
}

export async function getProgress(uid, courseId, topicId) {
  const ref  = doc(db, "users", uid, "progress", `${courseId}__${topicId}`);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function getAllProgress(uid, courseId, topicIds) {
  const out = {};
  for (const id of topicIds) out[id] = await getProgress(uid, courseId, id);
  return out;
}

// ── Module completion (professional courses) ──────────────────
export async function markModuleComplete(uid, courseId, moduleId) {
  const ref = doc(db, "users", uid, "progress", `${courseId}__${moduleId}`);
  await setDoc(ref, {
    completed:   true,
    completedAt: new Date().toISOString()
  }, { merge: true });
}

// ── Quiz result with a real pass mark (GenAI sub-modules) ─────
// Completion is written only on a pass; a failed attempt never touches
// completed/score/percent, so an earlier completion is kept.
export async function saveQuizResult(uid, courseId, topicId, score, total, passMark) {
  const ref  = doc(db, "users", uid, "progress", `${courseId}__${topicId}`);
  const snap = await getDoc(ref), prev = snap.exists() ? snap.data() : {};
  const data = { attempts: (prev.attempts || 0) + 1, lastScore: score, lastAttemptAt: new Date().toISOString() };
  if (score >= passMark) {
    const best = Math.max(prev.score ?? 0, score);
    Object.assign(data, {
      completed: true, score: best, total, percent: Math.round(best / total * 100),
      completedAt: prev.completedAt || new Date().toISOString()
    });
  }
  await setDoc(ref, data, { merge: true });
  return score >= passMark;
}
