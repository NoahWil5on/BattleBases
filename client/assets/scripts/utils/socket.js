"use strict";

let socket;
let updateInterval = undefined;

//initial connection to server
function init(){
    socket = io.connect();

    //on joining the server, start up game
    socket.on('join', (player) => {
        app.main.init();
    });
}

window.onload = init;