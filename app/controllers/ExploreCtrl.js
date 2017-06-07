"use strict";

app.controller('ExploreCtrl', function(DataFactory, $scope, AuthFactory, $route) {

    let user = AuthFactory.getUser();

    $scope.newBoardObject = {};

    DataFactory.getAllPins()
        .then( (allPins) => {
            console.log("allPins", allPins);
            $scope.allPins = allPins;
        });

        // pass into function input value from board-detail.html, push to boards collection in firebase and creates new custom key
    $scope.addNew = function (someText) {
        $scope.newBoardObject.title = someText;
        $scope.newBoardObject.uid = user;
        DataFactory.addBoard($scope.newBoardObject)
        .then((newBoardSucces)=>{
            $("#addBoardModal").modal('close');
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
            console.log("boardObj", boardObj);
            Object.keys(boardObj).forEach( (key)=>{
                boardObj[key].id = key;
                $scope.boardArray.push(boardObj[key]);
            });
        });
    };

    userBoards();


// getPins()
// getBoard()
// addBoard()
// addPin()


});
