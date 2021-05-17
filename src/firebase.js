import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyCSLoaqxaGoKwQABi-m0P9bUDHk9NaVv_I',
  authDomain: 'tech-7c145.firebaseapp.com',
  databaseURL: 'https://tech-7c145-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'tech-7c145',
  storageBucket: 'tech-7c145.appspot.com',
  messagingSenderId: '195114021470',
  appId: '1:195114021470:web:906b4dfe8f2744513a7acf',
  measurementId: 'G-NVTXJJ10V4'
}

const firebaseApp = firebase.initializeApp(config)
// const db = firebaseApp.firestore();

export default firebaseApp.database()
