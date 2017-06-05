"use strict";

app.controller("AuthCtrl", function($scope, AuthFactory){
    $scope.auth = {};

    $scope.registerUser = function(registerNewUser){
        AuthFactory.registerWithEmail(registerNewUser)
        .then((didRegister)=>{
            console.log(didRegister);
        });
    };
});
