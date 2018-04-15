"use strict";

let socket;
let updateInterval = undefined;

//initial connection to server
function joinServer(){
    socket = io.connect();

    //on joining the server, start up game
    socket.on('join', (data) => {
        app.main.host = data.host;
        if(!data.host){
            app.main.currentGameState = app.main.gameState.GAME;
            socket.emit('startGame', {});
        }
    });
    socket.on('startGame', () => {
        app.main.currentGameState = app.main.gameState.GAME
    });
    socket.on('updatePlayerInfo', (data) => {
        app.game.enemyCharacters = data.characters;
    })
}
function sendMyData(){
    socket.emit('updatePlayerInfo', {characters: app.game.myCharacters});
}
function init(){
    app.main.init();
}
window.onload = init;