"use strict";

console.log("HOWDY");


const app = angular.module("Pinterrupted", ["ngRoute", "ui.materialize","infinite-scroll"]);

let isAuth = (AuthFactory) =>
  new Promise ((resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then((userExists) => {
      if (userExists){
        console.log('Authenicated, go ahead');
        resolve();
      } else {
        console.log('Authenticated reject, GO AWAY');
        reject();
      }
    });
});

app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthCtrl'
    })
    .when('/explore', {
        templateUrl: 'partials/explore.html',
        controller: 'ExploreCtrl',
        resolve: {isAuth}
    })
    .when("/boards", {
        templateUrl: "partials/board-detail.html",
        controller: "BoardDetailCtrl",
        resolve: {isAuth}
    })
    .when("/boards/:userId", {
        templateUrl: "partials/profile-boards.html",
        controller: "ProfileBoardsCtrl"
    })
    .when("/userPins" ,{
        templateUrl: "partials/profile-pins.html",
        controller: "ProfilePinCtrl",
        resolve: {isAuth}
    })
    .otherwise('/');
});

app.run(($location, FBCreds) =>{
    let creds = FBCreds;
    let AuthConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL : creds.databaseURL
    };

    firebase.initializeApp(AuthConfig);

});
