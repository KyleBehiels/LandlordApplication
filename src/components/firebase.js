import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCPAMJAU1OWXPzwRMOXV32r0F1B9vNKvMc",
    authDomain: "landlordapplication-6cf45.firebaseapp.com",
    databaseURL: "https://landlordapplication-6cf45.firebaseio.com",
    projectId: "landlordapplication-6cf45",
    storageBucket: "landlordapplication-6cf45.appspot.com",
    messagingSenderId: "603341312541"
};
firebase.initializeApp(config);

export default firebase;

