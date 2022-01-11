// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCwp7Sw__MxJ8WY0Gjxrss37w8zEMyNbxU',
  authDomain: 'insta3rdtry.firebaseapp.com',
  projectId: 'insta3rdtry',
  storageBucket: 'insta3rdtry.appspot.com',
  messagingSenderId: '918100846879',
  appId: '1:918100846879:web:a1b8166bd728150d9fe82a',
  measurementId: 'G-T1WZ8L5RL0',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()

const storage = getStorage()

export { app, db, storage }
