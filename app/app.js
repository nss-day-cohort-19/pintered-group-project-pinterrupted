"use strict";

console.log("HOWDY");


const app = angular.module("Pinterrupted", ["ngRoute"]);


app.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: '',
        controller: ''
    })
    .when('/', {
        templateUrl: '',
        controller: '',
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


