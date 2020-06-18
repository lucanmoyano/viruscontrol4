//import firebase from "@/plugins/fireinit";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { mapGetters } from "vuex";





const userExists = (userId) => {
  firebase.firestore().ref(`user/${userId}`).once('value').then(function(snapshot) {
    console.log(snapshot.val());
  });
}

export const getUserDataFromFirebase = (user) => {
  return ({
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  });
}

export const getUserFromDatabase = async (id) => {
  const userDbRef = firebase.firestore().collection('user').doc(id);
  try {
    const doc = await userDbRef.get();
    return doc.data();
    
  } catch (e) {
  alert(e)
  return
  }

  
  
  //const doc = await userDbRef.get();
  
}

export const logout = () => {
  // localStorage.setItem('token', null);
  // localStorage.setItem('user', null);
  firebase.auth().signOut().then(() => {
    console.log('Se cerró la sesión del usuario correctamente');
  });
}

export const getLoggedUser = () => {
    // return localStorage.getItem('user');
  // return firebase.auth().currentUser;
  return this.$store.state.loggedUser;
}

export const saveUser = async (user) => {
  const userDbRef = firebase.firestore().collection("user").doc(user.email);
  await userDbRef.set({
    name: user.name ?? "",
    email: user.email ?? "",
    encryptedPass: user.encryptedPass ?? "",
    idDocument: user.idDocument ?? "",
    address: user.address ?? "",
    birthDate: user.birthDate ?? "",
    gender: user.gender ?? "",
    phone: user.phone ?? "",
    photo: user.photo ?? user.photoURL ?? "",
    userType: user.userType ?? citizenUserType
  }, { merge: true }).then(() => console.log('Usuario guardado')).catch((e) => console.log(e));
}

// CONSTANTES
const citizenUserType = {
  id: 1,
  name: "Citizen",
  showName: "Ciudadano"
};
