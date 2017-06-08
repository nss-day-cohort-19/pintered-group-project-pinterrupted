"use strict";

app.controller("ProfileBoardsCtrl", function($q, $window, $location, $scope, $routeParams, $route, DataFactory, AuthFactory){

$scope.currentBoard = $routeParams.userId;

let getUser = function(){
    $scope.user = AuthFactory.getUser();
    console.log("Current User", $scope.user);
};


let getBoardPins = function(){
    $scope.boardPins = [];
    DataFactory.getBoardPins($routeParams.userId)
    .then((response)=>{
        Object.keys(response).forEach( (key) => {
            response[key].id = key;
            $scope.boardPins.push(response[key]);
        });

    });
};


$scope.deleteCurrentPin = function (pinKey) {
    DataFactory.deletePin(pinKey)
       .then( (deleteComplete) => {
           $route.reload();
       });
    };


let getCurrentBoard = function(){
    DataFactory.getAllBoards()
    .then((boards)=>{
        boards.forEach(function(element){
            if (element.id === $scope.currentBoard){
                $scope.board = element;
            }
        });

    });
};


getUser();
getBoardPins();
getCurrentBoard();

});
