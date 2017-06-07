"use strict";


app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, DataFactory, AuthFactory){

    //use for testing, delete once able to pull back current user UID
    $scope.tempUID = "1234";

    //Should return UID to pass into both function on the page
    let user = AuthFactory.getUser();
//    console.log("Is there a current user?", user);

    $scope.newBoardObject = {};

    //pass into function input value from board-detail.html, push to boards collection in firebase and creates new custom key
    $scope.addNew = function (someText) {
        console.log("what did I get back?", someText);
        $scope.newBoardObject.title = someText;
        $scope.newBoardObject.uid = $scope.tempUID;
        console.log("checking new board object", $scope.newBoardObject);
        DataFactory.addBoard($scope.newBoardObject)
        .then((newBoardSucces)=>{
              console.log("Check firebase for new data", newBoardSucces);
        });
    };

    //delete button calls this function from board-detail.html
    $scope.deleteBoard = function () {
        console.log("delete button was clicked");
    };



    //sending userboards uid to get back board title and pass into board-detail.html
    //use Object.keys to return custom key from Firebase, use this key to pass in a unique ID for //each modal that is created for each card in the ng-repeat
    let userBoards = function () {
        $scope.boardArray = [];
        DataFactory.getUserBoards($scope.tempUID)
        .then((boardObj)=>{
            Object.keys(boardObj).forEach( (key)=>{
                boardObj[key].id = key;
                $scope.boardArray.push(boardObj[key]);
            });
            console.log("Is the key coming", $scope.boardArray);
        });
    };

    userBoards();

});
