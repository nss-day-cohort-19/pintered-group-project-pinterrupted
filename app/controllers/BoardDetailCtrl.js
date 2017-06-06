"use strict";
console.log("are we on speaking terms?");
// getPins()
// deletePins()
app.controller("BoardDetailCtrl", function($q, $window, $location, $scope, DataFactory, AuthFactory){
    let tempUID = 1234;
    let userBoards = DataFactory.getUserBoards(tempUID);
    console.log("what does data look like?", userBoards);

    let userBoards = function() {

    };

    userBoards();

});
