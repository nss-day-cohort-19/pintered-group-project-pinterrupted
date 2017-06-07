"use strict";

app.factory("DataFactory", function($q, $http, $window, FBCreds){



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

const getSinglePin = function(pinId){
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/pins/${pinId}.json`)
        .then((singlePinObj)=>{
            resolve(singlePinObj.data);
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

const deletePin = function(pinId){
    return $q((resolve, reject)=>{
        $http.delete(`${FBCreds.databaseURL}/pins/${pinId}.json`)
        .then((firebaseResponse)=>{
            resolve(firebaseResponse);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};



const getAllBoards = function(){
    let boards = [];
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/boards.json`)
        .then((boardsObj)=>{
        let boardsCollection = boardsObj.data;
          console.log("boardsCollection from firebase", boardsCollection);
          Object.keys(boardsCollection).forEach((key)=>{
            boardsCollection[key].id = key;
            boards.push(boardsCollection[key]);
            });
        resolve(boards);
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

const deleteBoard = function(boardId){
    return $q((resolve, reject)=>{
        $http.delete(`${FBCreds.databaseURL}/boards/${boardId}.json`)
        .then((firebaseResponse)=>{
            resolve(firebaseResponse);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};



return{
    getAllPins,
    getUserPins,
    getSinglePin,
    addPin,
    deletePin,
    getAllBoards,
    getUserBoards,
    addBoard,
    deleteBoard
};

});
