"use strict";

app.controller('ExploreCtrl', function(DataFactory, $scope) {

    DataFactory.getAllPins()
        .then( (allPins) => {
            console.log("allPins", allPins);
            $scope.allPins = allPins;
        });

// getPins()
// getBoard()
// addBoard()
// addPin()


});
