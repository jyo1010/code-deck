import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCtC3VlAZxEdUeoWkaY_Qpv9CpJ9qCQlw0",
    authDomain: "code-deck-998da.firebaseapp.com",
    projectId: "code-deck-998da",
    storageBucket: "code-deck-998da.appspot.com",
    messagingSenderId: "760363557532",
    appId: "1:760363557532:web:5425672785ef8610abc359",
    measurementId: "G-7HDBLVFTXG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebaseApp.auth();

export { db, auth };