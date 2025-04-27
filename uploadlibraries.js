// uploadLibraries.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');
const libraries = require('./src/libraries.json'); // Load your 50 libraries

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBicwMDK6P1tpRooSrWNGnaH1hNxK3556s",
  authDomain: "slib-directory.firebaseapp.com",
  projectId: "slib-directory",
  storageBucket: "slib-directory.firebasestorage.app",
  messagingSenderId: "87000112749",
  appId: "1:87000112749:web:7384b8441d8243b0666964"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Upload libraries
async function uploadLibraries() {
  try {
    for (const lib of libraries) {
      await addDoc(collection(db, 'libraries'), lib);
      console.log(`✅ Uploaded: ${lib.name}`);
    }
    console.log('🎉 All libraries uploaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error uploading libraries:', error);
    process.exit(1);
  }
}

uploadLibraries();
