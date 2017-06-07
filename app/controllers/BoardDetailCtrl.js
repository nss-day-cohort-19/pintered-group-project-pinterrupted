"use strict";


app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, DataFactory, AuthFactory){

    $scope.tempUID = "1234";
    let user = AuthFactory.getUser();
//    console.log("Is there a current user?", user);

    $scope.newBoardObject = {};

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

    //sending user boards uid to get back board
    let userBoards = function () {
        $scope.boardArray = [];
        DataFactory.getUserBoards($scope.tempUID)
        .then((boardObj)=>{
            for (let boards in boardObj) {
                let findCurrentUser = boardObj[boards];
                $scope.boardArray.push(findCurrentUser.title);
            }
        });
    };

    userBoards();

});
