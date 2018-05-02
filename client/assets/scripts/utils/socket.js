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
    socket.on('createNewEnemyForHost', (data) => {
        var img = '01';
        var health = 25;
        var damage = 10;
        var speed = 100;

        //ranged
        if (data == 2) {
            img = '02';
            health = 20;
            damage = 15;
            speed = 100;
        }//speed
        if (data == 3) {
            img = '03';
            health = 15;
            damage = 15;
            speed = 150;
        }//big boi
        if (data == 4) {
            img = '04';
            health = 80;
            damage = 20;
            speed = 70;
        }


        //negative because base needs to be flipped?
        if(app.game.enemyCurrency - 10 < 0) return;
        app.game.enemyCurrency -= 10;
        var charPos = JSON.parse(JSON.stringify(app.game.enemyBase.position))
        charPos.y += 20;
        app.game.enemyCharacters.push(new characterObject(
            '01',
            charPos,
            speed,
            health, //health
            damage, //damage
            .15,
            -1
        ));

        //console.log(app.game.enemyCharacters);
    });

    socket.on('updateNonHost', (data) => {
        //update lerp values

 //       for (var i = 0; i < app.game.myCharacters.length; i++) {
 //           app.game.myCharacters[i] = data.myCharacters[0];
 //           data.myCharacters.splice(0, 1);
 //       }
 //       //then add the new ones
 //       for (var i = 0; i < data.myCharacters.length; i++) {
 //           app.game.myCharacters.push(data.myCharacters[i]);
 //       }

        //Need to loop through each character in app
        //Compare with the same character from data
        //If they are the same, check to see if apps last update > data last update
        //assign previous positions of data characters to app characters
        //set app character alpha = 0.5

        
        //console.log("characters before:");
        //console.log(app.game.myCharacters);

        lerpData(data);

        //console.log("characters after:");
        for (var i = 0; i < app.game.myCharacters.length; i++) {
            console.log("Dest: " + app.game.myCharacters[0].destPosition.x);
            console.log("Prev: " + app.game.myCharacters[0].prevPosition.x);
            console.log("Pos: " + app.game.myCharacters[0].position.x);
        }

        

        //app.game.myCharacters = data.myCharacters;
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
function sendHostNewCharacter(data) {
    //send type of character created.
    socket.emit('createNewEnemyForHost', data);
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

function lerpData(data) {
    for (var i = 0; i < app.game.myCharacters.length; i++) {
        const myChar = app.game.myCharacters[i];
        var alreadyExists = false;
        //check if character exists in the data array
        for (var n = 0; n < data.myCharacters.length; n++) {
            if (myChar.id == data.myCharacters[n].id) {
                //same character in both arrays
                alreadyExists = true;
                //update values

                //check if its old
                if (myChar.lastUpdate <= data.myCharacters[n].lastUpdate) {
                    //update
                    app.game.myCharacters[i].lastUpdate = data.myCharacters[n].lastUpdate;

                    //positions
                    app.game.myCharacters[i].prevPosition = data.myCharacters[n].prevPosition;
                    app.game.myCharacters[i].destPosition = data.myCharacters[n].destPosition;

                    app.game.myCharacters[i].alpha = 0.05;

                    //not lerping
                    //app.game.myCharacters[i].position = data.myCharacters[n].position;


                    data.myCharacters.splice(n, 1);
                    //remove the character from the data, since we dont need them anymore
                    break;
                }

            }
        }
        //if our character isnt in the data array, then it means hes dead. remove him.
        if (!alreadyExists) {
            app.game.myCharacters.splice(i, 1);
            i--;
        }
    }

    //now loop through the rest of our data and add the new characters
    for (var i = 0; i < data.myCharacters.length; i++) {
        app.game.myCharacters.push(data.myCharacters[i]);
    }
}

function init(){
    app.main.init();
}
window.onload = init;