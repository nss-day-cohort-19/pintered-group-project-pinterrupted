"use strict";


app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, DataFactory, AuthFactory){

    $scope.tempUID = "1234";
    let user = AuthFactory.getUser();
    console.log("Is there a current user?", user);
    
    $scope.addNew = function (someText) {
        console.log("what did I get back?", someText);
    };

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
