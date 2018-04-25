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
        //have host update character every 20ms
        // if (app.main.host) {
        //     console.log("HOST");
        //     setInterval(sendCharacterList, 1000);
        // }
    });
    socket.on('startGame', () => {
        app.main.currentGameState = app.main.gameState.GAME
    });
    // socket.on('updatePlayerInfo', (data) => {
    //     app.game.enemyCharacters = data.characters;
    //     //For each of these enemy characters, change their direction to -1
    //     for (var i = 0; i < data.characters.length; i++) {
    //         app.game.enemyCharacters[i].direction = -1;
    //     }
    // });
    socket.on('createNewEnemyForHost', () => {
        //negative because base needs to be flipped?
        if(app.game.enemyCurrency - 10 < 0) return;
        app.game.enemyCurrency -= 10;
        var charPos = JSON.parse(JSON.stringify(app.game.enemyBase.position))
        charPos.y += 20;
        app.game.enemyCharacters.push(new characterObject(
            '01',
            charPos,
            100,
            20, //health
            10, //damage
            .15,
            -1
        ));

        //console.log(app.game.enemyCharacters);
    });

    socket.on('updateNonHost', (data) => {
        app.game.myCharacters = data.myCharacters;
        app.game.enemyCharacters = data.enemies;
        app.game.myBase.health = data.myHealth;
        app.game.enemyBase.health = data.enemyHealth;
        app.game.myTurret.rotation = data.myTurretRotation;
        app.game.enemyTurret.rotation = data.enemyTurretRotation;
        app.game.myBullets = data.myBullets;
        app.game.enemyBullets = data.enemyBullets;
        app.game.myCurrency = data.myCurrency;
    });
    socket.on('gameOver', (data) => {
        app.over.win = data.win;
        app.main.currentGameState = app.main.gameState.OVER;
    })
}
function sendOver(win){
    socket.emit('gameOver', {win: win});
    app.over.win = !win;
    app.main.currentGameState = app.main.gameState.OVER;
}
function sendHostNewCharacter(){
    socket.emit('createNewEnemyForHost');
}
function sendCharacterList() {
    //Send the new list every 20 ms, flipping the characters
    //console.log(app.game.myCharacters);
    socket.emit('updateNonHost', ({
        enemies: app.game.myCharacters,
        myCharacters: app.game.enemyCharacters,
        myHealth: app.game.enemyBase.health,
        enemyHealth: app.game.myBase.health,
        myBullets: app.game.enemyTurret.bullets,
        myTurretRotation: app.game.enemyTurret.rotation,
        enemyBullets: app.game.myTurret.bullets,
        enemyTurretRotation: app.game.myTurret.rotation,
        myCurrency: app.game.enemyCurrency,
    }));
}

function init(){
    app.main.init();
}
window.onload = init;