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
    socket.on('upgradeBase', () => {
        console.log('here');
        if(app.game.enemyBase.level < 3 && app.game.enemyCurrency - app.game.baseCost[app.game.enemyBase.level] >= 0){
            app.game.enemyCurrency -= app.game.baseCost[app.game.enemyBase.level];
            app.game.enemyBase.level++;
            var level = app.game.enemyBase.level;
            var stats = app.game.baseLevelStats;
            app.game.enemyBase.image = stats[level - 1].baseImage;
            app.game.enemyTurret.image = stats[level - 1].turretImage;
            app.game.enemyTurret.bulletType = stats[level - 1].bulletType;
            app.game.enemyTurret.range = stats[level - 1].range;
            app.game.enemyTurret.damage = stats[level - 1].damage;
            app.game.enemyTurret.fireRate = stats[level - 1].fireRate;
            app.game.enemyTurret.imageWidth = app.game.enemyTurret.image.width;
            app.game.enemyTurret.imageHeight = app.game.enemyTurret.image.height;
            app.game.enemyTurret.width = app.game.enemyTurret.imageWidth * app.game.enemyTurret.scale;
            app.game.enemyTurret.height = app.game.enemyTurret.imageHeight * app.game.enemyTurret.scale;
        }
    });
    socket.on('createNewEnemyForHost', (data) => {
        var enemyStats = app.game.characterStats[app.game.enemyBase.level - 1];
        var img = `reg?0${app.game.enemyBase.level}`;
        var health = enemyStats.reg.health;
        var damage = enemyStats.reg.damage;
        var speed = enemyStats.reg.speed;
        var value = enemyStats.reg.value;
        var cost = app.game.charRegCost;
        var ranged = false;
        var range = 0;

        //ranged
        if (data == 2) {
            img = `range?0${app.game.enemyBase.level}`;
            health = enemyStats.range.health;
            damage = enemyStats.range.damage;
            value = enemyStats.range.value;
            speed = enemyStats.range.speed;
            cost = app.game.charRangeCost;
            ranged = true;
            range = enemyStats.range.range;
        }//speed
        if (data == 3) {
            img = `speed?0${app.game.enemyBase.level}`;
            health = enemyStats.speed.health;
            damage = enemyStats.speed.damage;
            speed = enemyStats.speed.speed;
            value = enemyStats.speed.value;
            cost = app.game.charSpeedCost;
            var ranged = false;
            var range = 0;
        }//big boi
        if (data == 4) {
            img = `tank?0${app.game.enemyBase.level}`;
            health = enemyStats.tank.health;
            damage = enemyStats.tank.damage;
            speed = enemyStats.tank.speed;
            value = enemyStats.tank.value;
            cost = app.game.charTankCost;
            var ranged = false;
            var range = 0;
        }


        //negative because base needs to be flipped?
        if(app.game.enemyCurrency - cost < 0) return;
        app.game.enemyCurrency -= cost;
        var charPos = JSON.parse(JSON.stringify(app.game.enemyBase.position))
        charPos.y += 20;
        app.game.enemyCharacters.push(new characterObject(
            img,
            charPos,
            speed,
            health, //health
            damage, //damage
            value,
            ranged,
            range,
            .521,
            -1
        ));

        //console.log(app.game.enemyCharacters);
    });

    socket.on('updateNonHost', (data) => {       

        //app.game.myCharacters = data.myCharacters;
        if(app.game.enemyBase.level != data.enemyBase.level){
            var upgradeInfo = upgradeBase(app.game.enemyBase, app.game.enemyTurret, data.enemyBase);
            app.game.enemyBase = upgradeInfo.base;
            app.game.enemyTurret = upgradeInfo.turret;
        }
        if(app.game.myBase.level != data.myBase.level){
            var newInfo = upgradeBase(app.game.myBase, app.game.myTurret, data.myBase);
            app.game.myBase = newInfo.base;
            app.game.myTurret = newInfo.turret;
            app.game.baseCostText.text = app.game.baseCost[newInfo.base.level];
            app.game.upgradeBaseButton.image = getButton(`base?0${newInfo.base.level + 1}?`);
        }

        app.game.enemyCharacters = lerpData(app.game.enemyCharacters,data.enemies);
        app.game.myCharacters = lerpData(app.game.myCharacters,data.myCharacters);
        app.game.myBullets = lerpData(app.game.myBullets, data.myBullets);
        app.game.enemyBullets = lerpData(app.game.enemyBullets, data.enemyBullets);

        app.game.myTurret.rotation = lerp(app.game.myTurret.rotation, data.myTurretRotation, .2);
        app.game.enemyTurret.rotation = lerp(app.game.enemyTurret.rotation, data.enemyTurretRotation, .2);

        app.game.myBase.health = data.myBase.health;
        app.game.enemyBase.health = data.enemyBase.health;
        app.game.myCurrency = data.myCurrency;
    });
    socket.on('gameOver', (data) => {
        app.over.win = data.win;
        app.main.currentGameState = app.main.gameState.OVER;
    });
}
function upgradeBase(base, turret, data){
    base.level = data.level
    var level = base.level;
    var stats = app.game.baseLevelStats;
    base.image = stats[level - 1].baseImage;
    turret.image = stats[level - 1].turretImage;
    turret.bulletType = stats[level - 1].bulletType;
    turret.range = stats[level - 1].range;
    turret.damage = stats[level - 1].damage;
    turret.fireRate = stats[level - 1].fireRate;
    turret.imageWidth = turret.image.width;
    turret.imageHeight = turret.image.height;
    turret.width = turret.imageWidth * turret.scale;
    turret.height = turret.imageHeight * turret.scale;

    return {base, turret};
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
function sendHostUpgradeBase() {
    //send type of character created.
    socket.emit('upgradeBase', {});
}
function sendCharacterList() {
    //Send the new list every 20 ms, flipping the characters
    //console.log(app.game.myCharacters);



    socket.emit('updateNonHost', ({
        enemies: app.game.myCharacters,
        myCharacters: app.game.enemyCharacters,
        myBase: app.game.enemyBase,
        enemyBase: app.game.myBase,
        myBullets: app.game.enemyTurret.bullets,
        myTurretRotation: app.game.enemyTurret.rotation,
        enemyBullets: app.game.myTurret.bullets,
        enemyTurretRotation: app.game.myTurret.rotation,
        myCurrency: app.game.enemyCurrency,
    }));
}

function lerpData(myListArray, dataListArray) {
    var myList = myListArray;
    var dataList = dataListArray;
    for (var i = myList.length - 1; i >= 0; i--) {
        var alreadyExists = false;
        //check if character exists in the data array
        for (var n = dataList.length - 1; n >= 0; n--) {
            if (myList[i].id === dataList[n].id) {
                alreadyExists = true;

                myList[i].position.x = lerp(myList[i].position.x, dataList[n].position.x, .2);
                myList[i].position.y = lerp(myList[i].position.y, dataList[n].position.y, .2);
                myList[i].rotation = lerp(myList[i].rotation, dataList[n].rotation, .2);

                //if this is a ranged character also lerp their bullets;
                if(myList[i].ranged){
                    myList[i].bullets = lerpData(myList[i].bullets, dataList[n].bullets);
                }
                
                dataList.splice(n, 1);
                break;
            }
        }
        //if our character isnt in the data array, then it means hes dead. remove him.
        if (!alreadyExists) {
            myList.splice(i, 1);
        }
    }

    //now loop through the rest of our data and add the new characters
    for (var i = 0; i < dataList.length; i++) {
        myList.push(dataList[i]);
    }
    return myList;
}

function init(){
    app.main.init();
}
window.onload = init;