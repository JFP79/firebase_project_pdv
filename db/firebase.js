const {initializeApp} = require('firebase/app');
const {getFirestore} = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC32UtlHTQS0aT9sS9gIk-d23a_X96LBJs",
     authDomain: "projeto-web-pdv.firebaseapp.com",
    projectId: "projeto-web-pdv",
    storageBucket: "projeto-web-pdv.appspot.com",
    messagingSenderId: "215732169778",
    appId: "1:215732169778:web:2ad5a43a663cf2c3b3202b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

module.exports = db;