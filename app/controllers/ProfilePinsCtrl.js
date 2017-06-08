"use strict";

// addPin()
// createBoard()
// getPins()
// getBoards()
// deletePin()

app.controller("ProfilePinCtrl", function($q, $window, $location, $scope, $route, DataFactory, AuthFactory){

    let user = AuthFactory.getUser();
    $scope.name = AuthFactory.getUser();

    $scope.newBoardObject = {};
    $scope.newPinObject = {
        url: "",
        title: "",
        description: "",
        uid: user
    };

    $scope.addNewPin = () => {
        $scope.boardArray.forEach( (element) => {
            if (element.title === $scope.boardArray.id) {
                $scope.newPinObject.board_id = element.id;
            }
        });
        console.log("newPinObject", $scope.newPinObject);
        DataFactory.addPin($scope.newPinObject)
        .then( (addedPin) => {
            console.log("addedPin", addedPin);
            $scope.addedPin = addedPin;
            $("#addProPinModal").modal('close');
            $route.reload();
        });
    };



//     delete button calls this function from board-detail.html
    $scope.deleteCurrentPin = function (pinKey) {
        console.log("delete Pin was clicked", pinKey);
       DataFactory.deletePin(pinKey)


       .then( (deleteComplete) => {
           $route.reload();
       });
    };



    let userPins = function () {
        $scope.pinArray = [];
        DataFactory.getUserPins(user)
        .then((PinObj)=>{
//            console.log("user pins: ", PinObj);
            Object.keys(PinObj).forEach( (key)=>{
                PinObj[key].id = key;
                $scope.pinArray.push(PinObj[key]);
                console.log("what is pin key: ", $scope.pinArray);
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
