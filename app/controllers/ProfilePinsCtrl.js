"use strict";

// addPin()
// createBoard()
// getPins()
// getBoards()
// deletePin()

app.controller("ProfilePinCtrl", function($q, $window, $location, $scope, $route, DataFactory, AuthFactory){

    let user = AuthFactory.getUser();
    $scope.name = AuthFactory.getUser();
    $scope.tempUID = "1234";
    $scope.tempPinKey = "pin_1";



//     delete button calls this function from board-detail.html
    $scope.deleteCurrentBoard = function (pinKey) {
        console.log("delete Pin was clicked");
//        DataFactory.deletePin($scope.tempPinKey)
//
//        .then( (deleteComplete) => {
//            $route.reload();
//        });
    };



    let userPins = function () {
        $scope.pinArray = [];
        DataFactory.getUserPins($scope.tempUID)
        .then((PinObj)=>{
            console.log("user pins: ", PinObj);
            Object.keys(PinObj).forEach( (key)=>{
                PinObj[key].id = key;
                $scope.pinArray.push(PinObj[key]);
            });
        });
    };
    userPins();

    let userBoards = function () {
        $scope.boardArray = [];
        DataFactory.getUserBoards(user)
        .then((boardObj)=>{
            console.log("boardObj", boardObj);
            Object.keys(boardObj).forEach( (key)=>{
                boardObj[key].id = key;
                $scope.boardArray.push(boardObj[key]);
            });
        });
    };

    userBoards();

});
