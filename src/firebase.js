import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyABk_ljr9PJiCTrBJHvnNckIQ637g32jd8",
    authDomain: "netflix-clone-649ab.firebaseapp.com",
    projectId: "netflix-clone-649ab",
    storageBucket: "netflix-clone-649ab.appspot.com",
    messagingSenderId: "470387813078",
    appId: "1:470387813078:web:2c6235c3a1a520fd4c3777"
  };

  const firebaseapp = firebase.initializeApp(firebaseConfig);

  const db = firebaseapp.firestore();

  const auth = firebase.auth();

  export { auth };
  export default db;
