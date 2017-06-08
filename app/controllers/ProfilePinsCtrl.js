"use strict";

// addPin()
// createBoard()
// getPins()
// getBoards()
// deletePin()

app.controller("ProfilePinCtrl", function($q, $window, $location, $scope, $route, DataFactory, AuthFactory){

    let user = AuthFactory.getUser();
    //$scope.name = AuthFactory.getUser();

    $scope.newBoardObject = {};
    $scope.newPinObject = {
        url: "",
        title: "",
        description: "",
        uid: user
    };


// new pins would not create unless a new board was first created because the unique key the new board creates must be passed into the new add pin method

// the drop down was not selecting and adding, so built in  IF Statement method to get value of select options and pass it(key) into the add pins method
     $scope.addNewBoard = function () {

        let selectValue = angular.element('#select-id').val();
        console.log("what is current select", selectValue);
        //had to check for empty strings because it allowed used to create a board without writing or selecting a title
        if (selectValue !== "" || $scope.newPinObject.title !== "") {
            // if option selected then do this IF Statement
            if (selectValue !== "") {
                $scope.newPinObject.board_id = selectValue;
                DataFactory.addPin($scope.newPinObject)
                .then((resolved) =>{
                    $("#addProPinModal").modal('close');
                    console.log("Pin added to selected board", selectValue);
                    $route.reload();
                });
            // if create new board then do the ELSE Statement
            }else {
                $scope.newBoardObject.title = $scope.newPinObject.title;
                $scope.newBoardObject.uid = user;
                DataFactory.addBoard($scope.newBoardObject)
                .then((newBoardSucces)=>{
                    console.log("addNewBoard(): " + newBoardSucces.name);
                    $scope.newPinObject.board_id = newBoardSucces.name;
                    return DataFactory.addPin($scope.newPinObject);
                })
                .then( (addedPin) => {
                    console.log("addedPin", addedPin);
        //            $scope.addedPin = addedPin;
                    $("#addProPinModal").modal('close');
                    $route.reload();

                });
            }
        }
    };



//     delete button calls this function from board-detail.html
    $scope.deleteCurrentPin = function (pinKey) {
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

            });
        });
    };
    userPins();

    let userBoards = function () {
        $scope.boardArray = [];
        DataFactory.getUserBoards(user)
        .then((boardObj)=>{
//            console.log("boardObj", boardObj);
            Object.keys(boardObj).forEach( (key)=>{
                boardObj[key].id = key;
                $scope.boardArray.push(boardObj[key]);
            });
        });
    };

    userBoards();

});
