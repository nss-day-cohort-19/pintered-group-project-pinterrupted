"use strict";

console.log("HOWDY");


const app = angular.module("Pinterrupted", ["ngRoute", "ui.materialize"]);


app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'partials/auth.html',
        controller: 'AuthCtrl'
    })
    .when('/explore', {
        templateUrl: 'partials/explore.html',
        controller: 'ExploreCtrl'
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
