"use strict";

app.factory("AuthFactory", function($q, $http, $rootScope, FBCreds) {
  let currentUserData = null;

//Firebase: Determine if user is authenticated.
  let isAuthenticated = () => {
      return firebase.auth().currentUser ? true : false;
  };

//Firebase: Return email, UID for user that is currently logged in.
  let getUser = () => {
    return firebase.auth().currentUser;
  };

// Kills browser cookie with firebase credentials
  let logout = () => {
    firebase.auth().signOut();
  };

//Firebase: Use input credentials to authenticate user.
  let authenticate = (credentials) => {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  };

//Firebase: Register a new user with email and password
  let registerWithEmail = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
  };

  return {isAuthenticated, getUser, logout, registerWithEmail, authenticate};
});
