// Firebase SDK loaded from Google's CDN (keeps the app small; nothing to build on the school's side).
import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js';
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, sendEmailVerification, sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js';
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager, getFirestore,
  doc, collection, setDoc, updateDoc, addDoc, deleteDoc, getDoc, onSnapshot, query, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js';

export function init(config) {
  const app = initializeApp(config);
  let fs;
  try { fs = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }); }
  catch (e) { fs = getFirestore(app); }
  return { auth: getAuth(app), fs };
}

export {
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendEmailVerification, sendPasswordResetEmail,
  doc, collection, setDoc, updateDoc, addDoc, deleteDoc, getDoc, onSnapshot, query, where, serverTimestamp
};
