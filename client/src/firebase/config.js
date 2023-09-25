import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDUFpH2UcxFlhtNotzWpSklNp4DceBiKVU",
    authDomain: "event-reservations-b17c6.firebaseapp.com",
    projectId: "event-reservations-b17c6",
    storageBucket: "event-reservations-b17c6.appspot.com",
    messagingSenderId: "914367010624",
    appId: "1:914367010624:web:9bf1df5c118086901e4ca5"
  };

  // init firebase
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore();

  export { db }