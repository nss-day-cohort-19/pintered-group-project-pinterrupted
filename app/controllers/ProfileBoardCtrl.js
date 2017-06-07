"use strict";

app.controller("ProfileBoardsCtrl", function($q, $window, $location, $scope, $routeParams, DataFactory, AuthFactory){

let getUser = function(){
    $scope.user = AuthFactory.getUser();
    console.log("Current User", $scope.user);
};

let getBoardPins = function(){
    DataFactory.getBoardPins($routeParams.userId)
    .then((response)=>{
        $scope.boardPins = response;
    });
};

let getCurrentBoard = function(){
    DataFactory.getAllBoards()
    .then((boards)=>{
        $scope.boards =
    })
}


getUser();
getBoardPins();

});
