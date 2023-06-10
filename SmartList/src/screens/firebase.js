import firebase from 'firebase';

const firebaseConfig = {
  // Aquí debes agregar la configuración de tu proyecto de Firebase
  apiKey: "AIzaSyAPKUPLlKh2C5ikEQP8sYZkrPtNaLIyqbM ",
  authDomain: " smartlist-eb7b4.firebaseapp.com ",
  projectId: "smartlist-eb7b4",
  storageBucket: "gs://smartlist-eb7b4.appspot.com",
  appId: "1:137477349225:android:0fc9bf6455fb4967e767f8",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
