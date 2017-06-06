"use strict";

app.factory("DataFactory", function($q, $http, FBCreds){



const getAllPins = function(){
    let pins = [];
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/pins.json`)
        .then((pinsObj)=>{
        let pinsCollection = pinsObj.data;
          console.log("pinsCollection from firebase", pinsCollection);
          Object.keys(pinsCollection).forEach((key)=>{
            pinsCollection[key].id = key;
            pins.push(pinsCollection[key]);
            });
        resolve(pins);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

const getUserPins = function(userId){
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/pins.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userPinsObj)=>{
            console.log(`Pins for ${userId}`, userPinsObj.data);
            resolve(userPinsObj.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

const addPin = function(newPin){
    return $q((resolve, reject)=>{
        $http.post(`${FBCreds.databaseURL}/pins.json`, newPin)
        .then((newPinResponse)=>{
            console.log("Response From Posting New Pin", newPinResponse.data);
            resolve(newPinResponse.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};








const getAllBoards = function(){
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/boards.json`)
        .then((boardsObj)=>{
            console.log("All Boards From Firebase", boardsObj.data);
            resolve(boardsObj.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

const getUserBoards = function(userId){
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/boards.json?orderBy="uid"&equalTo="${userId}"`)
        .then((userBoardsObj)=>{
            console.log(`Boards for ${userId}`, userBoardsObj.data);
            resolve(userBoardsObj.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

const addBoard = function(newBoard){
    return $q((resolve, reject)=>{
        $http.post(`${FBCreds.databaseURL}/boards.json`, newBoard)
        .then((newBoardResponse)=>{
            console.log("Response From Posting New Board", newBoardResponse.data);
            resolve(newBoardResponse.data);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};



return{
    getAllPins,
    getAllBoards,
    getUserPins,
    getUserBoards,
    addPin,
    addBoard
};

});
