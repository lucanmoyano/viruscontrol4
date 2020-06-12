import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDnlBoUYDZYtyn3IQ8Cdqr4y4YuDB5GZqw",
  authDomain: "viruscontrol-uy.firebaseapp.com",
  databaseURL: "https://viruscontrol-uy.firebaseio.com",
  projectId: "viruscontrol-uy",
  storageBucket: "viruscontrol-uy.appspot.com",
  messagingSenderId: "783947977230",
  appId: "1:783947977230:web:6906e85abbfc7daf98a25f",
  measurementId: "G-5HSFVQH0MG"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : '';
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.database();
export const StoreDB = firebase.firestore();

export default firebase;
