"use strict";

app.controller('MiniNavCtrl', function ($scope, AuthFactory, DataFactory) {

  $scope.name = AuthFactory.getUser();
  $scope.profileName = "";

  let getUserName = function(){
    DataFactory.getUserName($scope.name)
    .then(function(data){
      $scope.profileName = data;
      console.log($scope.profileName);
    });
  };

getUserName();

});
