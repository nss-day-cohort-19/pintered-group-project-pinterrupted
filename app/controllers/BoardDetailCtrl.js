"use strict";


app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, $route, DataFactory, AuthFactory){

    let user = AuthFactory.getUser();
    $scope.name = AuthFactory.getUser();
    console.log("looking for current user", $scope.name);
    // should return UID to pass into both function on the page
    // ng-included

//        DataFactory.getUserName($scope.name);


//    $scope.userName = DataFactory.getUserName($scope.name);
//    console.log("This is users obj", $scope.userName);


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
//    userUidCall();
    userBoards();

});
