const { initializeApp } = require ("firebase/app");
const { getFirestore } = require("firebase/firestore");


const firebaseConfig = {
  apiKey: "AIzaSyBhOIQY8rjQDqtvrM3QCKsu2up8cr0VMnU",
  authDomain: "projeto-web-luciano.firebaseapp.com",
  projectId: "projeto-web-luciano",
  storageBucket: "projeto-web-luciano.firebasestorage.app",
  messagingSenderId: "579634925897",
  appId: "1:579634925897:web:b4d498c769672f85dcca98",
  measurementId: "G-N1EE42QZTK"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = db;