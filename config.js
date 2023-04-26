import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBezfC74hRCXq8CRilkq-U40R2K0nmHK5c",
    authDomain: "primal-67078.firebaseapp.com",
    projectId: "primal-67078",
    storageBucket: "primal-67078.appspot.com",
    messagingSenderId: "845855036415",
    appId: "1:845855036415:web:d665d11407561d09534dca",
    measurementId: "G-C33S9WRWSB"
  };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }