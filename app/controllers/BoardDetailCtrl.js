"use strict";


app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, $route, DataFactory, AuthFactory){


    // should return UID to pass into both function on the page
    // use scope.name in getUser function so it will display user name in mininav.html that is
    // ng-included
    let user = AuthFactory.getUser();
//    console.log("Is there a current user?", user);


    $scope.newBoardObject = {};

    // pass into function input value from board-detail.html, push to boards collection in firebase and creates new custom key
    $scope.addNew = function (someText) {
        $scope.newBoardObject.title = someText;
        $scope.newBoardObject.uid = user;
        DataFactory.addBoard($scope.newBoardObject)
        .then((newBoardSucces)=>{
            $route.reload();
        });
    };

    // delete button calls this function from board-detail.html
    $scope.deleteCurrentBoard = function (boardKey) {
        DataFactory.deleteBoard(boardKey)

        .then( (deleteComplete) => {
            $route.reload();
        });
    };



    // sending userboards uid to get back board title and pass into board-detail.html
    // use Object.keys to return custom key from Firebase, use this key to pass in a unique ID for
    // each modal that is created for each card in the ng-repeat
    let userBoards = function () {
        $scope.boardArray = [];
        DataFactory.getUserBoards(user)
        .then((boardObj)=>{
            Object.keys(boardObj).forEach( (key)=>{
                boardObj[key].id = key;
                $scope.boardArray.push(boardObj[key]);
            });
        });
    };

    userBoards();

});
