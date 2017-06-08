"use strict";

app.controller('ExploreCtrl', function(DataFactory, $scope, AuthFactory, $route, SearchTermData) {
    $scope.searchText = SearchTermData;
    let user = AuthFactory.getUser();

    $scope.getPins = () => {
        DataFactory.getAllPins()
        .then((response) => {
            $scope.allPins = response;
        });
    };

    $scope.getPins();

    $scope.addToBoard = (pinsId) => {
        $scope.boardsArray = [];
        DataFactory.getSinglePin(pinsId)
        .then( (pinObject) => {
            console.log("pinObject", pinObject);
            pinObject.uid = user;
            DataFactory.getUserBoards(user)
            .then((boards)=>{
                Object.keys(boards).forEach( (key)=>{
                    boards[key].id = key;
                    $scope.boardsArray.push(boards[key]);
                });
                console.log("boardsArray", $scope.boardsArray);
                let selectValue = angular.element('#selected-id').val();
                console.log("selectValue", selectValue);
                if (selectValue !== "" || $scope.newPinObject.title !== "") {
                    $scope.boardsArray.forEach(function(element){
                        if (element.title === selectValue) {
                            pinObject.board_id = element.id;
                            console.log("element.id", element.id);
                        } else {
                        $scope.newBoardObject.title = $scope.newPinObject.board_name;
                        $scope.newBoardObject.uid = user;
                        }
                    });
                    console.log("newBoardObject", $scope.newBoardObject);
                    DataFactory.addBoard($scope.newBoardObject)
                    .then((newBoardSucces)=>{
                        console.log("addNewBoard(): " + newBoardSucces.name);
                            pinObject.board_id = newBoardSucces.name;
                            return DataFactory.addPin(pinObject);
                        });
                    console.log("test");
                    // DataFactory.addPin(pinObject);
                    $(`#pin--${pinsId}`).modal('close');
                        $route.reload();

                }
        });
    });
};


    $scope.newBoardObject = {};
    $scope.newPinObject = {
        url: "",
        title: "",
        description: "",
        uid: user
    };

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
                    $("#exploreModal").modal('close');
                    console.log("Pin added to selected board", selectValue);
                    $route.reload();
                });
            // if create new board then do the ELSE Statement
            }else {
                $scope.newBoardObject.title = $scope.newPinObject.board_name;
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
                    $("#exploreModal").modal('close');
                    $route.reload();

                });
            }
        }
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
            console.log("boardArray", $scope.boardArray);
        });
    };

    userBoards();



// getPins()
// getBoard()
// addBoard()
// addPin()


});
