
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBicwMDK6P1tpRooSrWNGnaH1hNxK3556s",
  authDomain: "slib-directory.firebaseapp.com",
  projectId: "slib-directory",
  storageBucket: "slib-directory.firebasestorage.app",
  messagingSenderId: "87000112749",
  appId: "1:87000112749:web:7384b8441d8243b0666964"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
