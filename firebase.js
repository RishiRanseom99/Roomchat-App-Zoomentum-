import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBxUjs1c-qcjrGYLwqLoGuJuK9L8Tc3JrI",
    authDomain: "whatsapp-clone-72de2.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-72de2.firebaseio.com",
    projectId: "whatsapp-clone-72de2",
    storageBucket: "whatsapp-clone-72de2.appspot.com",
    messagingSenderId: "321563024605",
    appId: "1:321563024605:web:2e11224cff29d60faf4f34",
    measurementId: "G-7D1MP11JEX"
  };
  
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
  