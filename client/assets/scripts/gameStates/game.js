"use strict"

var app = app || {};

app.game = {

    //game property values
    myCharacters: [],
    enemyCharacters: [],

    myBase: undefined,
    enemyBase: undefined,

    myTurret: undefined,
    enemyTurret: undefined,

    myBullets: [],
    enemyBullets: [],

    myCurrency: 25,
    enemyCurrency: 25,

    makeCharacterButton: undefined,
    makeRangedCharButton: undefined,
    makeSpeedCharButton: undefined,
    makeBigCharButton: undefined,
    upgradeBaseButton: undefined,

    currencyText: undefined,
    incomeWait: .8,
    currencyCounter: 0,

    charRegCost: 10,
    charSpeedCost: 8,
    charRangeCost: 15,
    charTankCost: 30,

    baseCost: [0, 40, 60],
    baseLevelStats: [{}, {}, {},],
    characterStats: [{},{},{}],

    regCostText: undefined,
    speedCostText: undefined,
    rangeCostText: undefined,
    tankCostText: undefined,
    baseCostText: undefined,

    //initialize game
    init: function () {
        //make base
        var base = getBase('01');
        var basePos = {
            x: ((base.width / 2) * .5) - (app.main.worldSize.width / 2) - 50,
            y: 100
        };
        var enemyBasePos = {
            x: ((base.width / 2) * .5) - (app.main.worldSize.width / 2) - 50,
            y: 100
        };
        enemyBasePos.x *= -1;
        this.myBase = new baseObject(
            '01',
            basePos,
            .521
        );
        this.enemyBase = new baseObject(
            '01',
            enemyBasePos,
            .521
        )

        //make turret
        this.myTurret = new turretObject(
            '01',   //turret
            '01',   //bullet
            500,    //range
            5,     //damage
            1,      //rounds per second
            {
                x: this.myBase.position.x + 50,
                y: this.myBase.position.y - 100
            },   //position
            0,      //rotation
            .521,     //scale
            1);     //flip direction
        this.enemyTurret = new turretObject(
            '01',   //turret
            '01',   //bullet
            500,    //range
            5,     //damage
            1,      //rounds per second
            {
                x: this.enemyBase.position.x - 50,
                y: this.enemyBase.position.y - 100
            },   //position
            0,      //rotation
            .521,     //scale
            -1);     //flip direction

            //set up stats for base leveles
        this.baseLevelStats[1] = {
            baseImage: getBase('02'),
            turretImage: getTurret('02'),
            bulletType: '02',
            range: 600,
            damage: 7,
            fireRate: 1.2,
        }
        this.baseLevelStats[2] = {
            baseImage: getBase('03'),
            turretImage: getTurret('03'),
            bulletType: '03',
            range: 650,
            damage: 9,
            fireRate: 1.5,
        }
        //set up stats for each character at each level
        this.characterStats[0] = {
            reg: {
                health: 25,
                damage: 10,
                speed: 100,
                value: 8
            },
            speed: {
                health: 15,
                damage: 15,
                speed: 175,
                value: 5
            },
            range: {
                health: 15,
                damage: 15,
                speed: 100,
                range: 200,
                value: 12
            },
            tank: {
                health: 80,
                damage: 20,
                speed: 60,
                value: 25
            }
        }
        this.characterStats[1] = {
            reg: {
                health: 30,
                damage: 15,
                speed: 100,
                value: 9
            },
            speed: {
                health: 20,
                damage: 17,
                speed: 200,
                value: 7
            },
            range: {
                health: 20,
                damage: 15,
                speed: 110,
                range: 215,
                value: 13
            },
            tank: {
                health: 90,
                damage: 23,
                speed: 70,
                value: 27
            }
        }
        this.characterStats[2] = {
            reg: {
                health: 35,
                damage: 17,
                speed: 110,
                value: 10
            },
            speed: {
                health: 20,
                damage: 20,
                speed: 225,
                value: 8
            },
            range: {
                health: 22,
                damage: 18,
                speed: 120,
                range: 230,
                value: 15
            },
            tank: {
                health: 100,
                damage: 25,
                speed: 75,
                value: 30
            }
        }

        //button stuff
        var button = getButton("char?reg?");
        //adjusting position for scale I'll be doing to this object
        var charButtonPos = {
            x: 350, y: 105
        };

        //make all in game buttons
        this.makeCharacterButton = new buttonObject(
            "char?reg?",		//image
            charButtonPos,
            .521);	    //position

        this.makeSpeedCharButton = new buttonObject(
            "char?speed?",
            {
                x: (charButtonPos.x) + (70 * 1),
                y: (charButtonPos.y),
            },
            .521);

        this.makeRangedCharButton = new buttonObject(
            "char?range?",
            {
                x: (charButtonPos.x) + (70 * 2),
                y: (charButtonPos.y),
            },
            .521);

        this.makeBigCharButton = new buttonObject(
            "char?tank?",
            {
                x: (charButtonPos.x) + (70 * 3),
                y: (charButtonPos.y),
            },
            .521);
        this.upgradeBaseButton = new buttonObject(
            "base?02?",
            {
                x: (charButtonPos.x) + (70 * 5),
                y: (charButtonPos.y),
            },
            .521);

            //display your currency
        this.currencyText = new textObject(
            `${this.myCurrency}`,    //text
            {
                x: 200,             //position
                y: 85
            },
            '#000',                             //color
            'left',                           //text align
            'LuckiestGuy',                       //font
            '28'                               //size
        );
        //cost of each item in shop
        this.regCostText = new textObject(
            `${this.charRegCost}`,    //text
            {
                x: this.makeCharacterButton.position.x,             //position
                y: this.makeCharacterButton.position.y + 10
            },
            '#fff',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '28',
            true,
            "#000",
            2                                 //size
        );
        this.speedCostText = new textObject(
            `${this.charSpeedCost}`,    //text
            {
                x: this.makeSpeedCharButton.position.x,             //position
                y: this.makeSpeedCharButton.position.y + 10
            },
            '#fff',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '28',
            true,
            "#000",
            2                                 //size
        );
        this.rangeCostText = new textObject(
            `${this.charRangeCost}`,    //text
            {
                x: this.makeRangedCharButton.position.x,             //position
                y: this.makeRangedCharButton.position.y + 10
            },
            '#fff',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '28',
            true,
            "#000",
            2                                 //size
        );
        this.tankCostText = new textObject(
            `${this.charTankCost}`,    //text
            {
                x: this.makeBigCharButton.position.x,             //position
                y: this.makeBigCharButton.position.y + 10
            },
            '#fff',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '28',
            true,
            "#000",
            2                                 //size
        );
        this.baseCostText = new textObject(
            `${this.baseCost[this.myBase.level]}`,    //text
            {
                x: this.upgradeBaseButton.position.x,             //position
                y: this.upgradeBaseButton.position.y + 10
            },
            '#fff',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '28',
            true,
            "#000",
            2                                 //size
        );
    },
    //update all game objects
    update: function (dt, ctx) {
        this.updateButtons();
        if (app.main.host) {
            this.currencyCounter += dt;
            if (this.currencyCounter > this.incomeWait) {
                this.currencyCounter = 0;
                this.myCurrency++;
                this.enemyCurrency++;
            }
            this.myTurret.update(dt, this.enemyCharacters);
            this.enemyTurret.update(dt, this.myCharacters);
            this.updatePositions();
            this.updateCharacters(dt);
            this.updateCollisions(dt);
            sendCharacterList();
            this.checkOver();
        }
        this.draw(ctx);
    },
    //check if the game has reached the end condition
    checkOver(){
        if(this.enemyBase.health <= 0){
            sendOver(false);
        }
        if(this.myBase.health <= 0){            
            sendOver(true);
        }
    },
    //called if host
    updateCharacters: function (dt) {
        for (var i = 0; i < this.myCharacters.length; i++) {
            this.myCharacters[i].update(dt);
        }

        for (var i = 0; i < this.enemyCharacters.length; i++) {
            this.enemyCharacters[i].update(dt);
        }

        //console.log(this.enemyCharacters);
    },
    //update prev position for lerping
    updatePositions: function () {
        for (var i = 0; i < this.myCharacters.length; i++) {
            const myChar = this.myCharacters[i];

            //assign previous positions to last positions
            this.myCharacters[i].prevPosition = myChar.position;
        }
    },
    //check for button clicks
    updateButtons: function () {
        if (this.upgradeBaseButton.clicked(true)) {
            if (app.main.host) {

                //level up base and base stats
                if (this.myBase.level >= 3 || this.myCurrency - this.baseCost[this.myBase.level] < 0) return;
                this.myCurrency -= this.baseCost[this.myBase.level];
                this.myBase.level++;
                var level = this.myBase.level;
                var stats = this.baseLevelStats;
                this.baseCostText.text = this.baseCost[level];
                this.upgradeBaseButton.image = getButton(`base?0${level + 1}?`);
                this.myBase.image = stats[level - 1].baseImage;
                this.myTurret.image = stats[level - 1].turretImage;
                this.myTurret.bulletType = stats[level - 1].bulletType;
                this.myTurret.range = stats[level - 1].range;
                this.myTurret.damage = stats[level - 1].damage;
                this.myTurret.fireRate = stats[level - 1].fireRate;
                this.myTurret.imageWidth = this.myTurret.image.width;
                this.myTurret.imageHeight = this.myTurret.image.height;
                this.myTurret.width = this.myTurret.imageWidth * this.myTurret.scale;
                this.myTurret.height = this.myTurret.imageHeight * this.myTurret.scale;
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                if (this.myBase.level < 3) {
                    sendHostUpgradeBase();
                }
            }
        }
        //make regular character
        if (this.makeCharacterButton.clicked(true)) {
            if (app.main.host) {
                if (this.myCurrency - this.charRegCost < 0) return;
                this.myCurrency -= this.charRegCost;
                var charPos = JSON.parse(JSON.stringify(this.myBase.position))
                charPos.y += 20;
                this.myCharacters.push(new characterObject(
                    `reg?0${this.myBase.level}`,
                    charPos,
                    this.characterStats[this.myBase.level - 1].reg.speed,
                    this.characterStats[this.myBase.level - 1].reg.health, //health
                    this.characterStats[this.myBase.level - 1].reg.damage, //damage
                    this.characterStats[this.myBase.level - 1].reg.value,
                    false,
                    0,
                    .521,
                    1
                ));
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                sendHostNewCharacter(1);
            }
        }
        //make ranged character
        if (this.makeRangedCharButton.clicked(true)) {
            if (app.main.host) {
                if (this.myCurrency - this.charRangeCost < 0) return;
                this.myCurrency -= this.charRangeCost;
                var charPos = JSON.parse(JSON.stringify(this.myBase.position))
                charPos.y += 20;
                this.myCharacters.push(new characterObject(
                    `range?0${this.myBase.level}`,
                    charPos,
                    this.characterStats[this.myBase.level - 1].range.speed,
                    this.characterStats[this.myBase.level - 1].range.health, //health
                    this.characterStats[this.myBase.level - 1].range.damage, //damage
                    this.characterStats[this.myBase.level - 1].range.value,
                    true,
                    this.characterStats[this.myBase.level - 1].range.range,
                    .521,
                    1
                ));
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                sendHostNewCharacter(2);
            }
        }
        //make speedy character
        if (this.makeSpeedCharButton.clicked(true)) {
            if (app.main.host) {
                if (this.myCurrency - this.charSpeedCost < 0) return;
                this.myCurrency -= this.charSpeedCost;
                var charPos = JSON.parse(JSON.stringify(this.myBase.position))
                charPos.y += 20;
                this.myCharacters.push(new characterObject(
                    `speed?0${this.myBase.level}`,
                    charPos,
                    this.characterStats[this.myBase.level - 1].speed.speed,
                    this.characterStats[this.myBase.level - 1].speed.health, //health
                    this.characterStats[this.myBase.level - 1].speed.damage, //damage
                    this.characterStats[this.myBase.level - 1].speed.value,
                    false,
                    0,
                    .521,
                    1
                ));
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                sendHostNewCharacter(3);
            }
        }
        //make tanky character
        if (this.makeBigCharButton.clicked(true)) {
            if (app.main.host) {
                if (this.myCurrency - this.charTankCost < 0) return;
                this.myCurrency -= this.charTankCost;
                var charPos = JSON.parse(JSON.stringify(this.myBase.position))
                charPos.y += 20;
                this.myCharacters.push(new characterObject(
                    `tank?0${this.myBase.level}`,
                    charPos,
                    this.characterStats[this.myBase.level - 1].tank.speed,
                    this.characterStats[this.myBase.level - 1].tank.health, //health
                    this.characterStats[this.myBase.level - 1].tank.damage, //damage
                    this.characterStats[this.myBase.level - 1].tank.value,
                    false,
                    0,
                    .521,
                    1
                ));
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                sendHostNewCharacter(4);
            }
        }
    },
    //do all collision checks
    updateCollisions: function (dt) {
        //my players vs enemy players
        //my players vs enmey base
        //enemy players vs my base
        /********************* */
        //my turret bullets vs enemy players
        //enemy turret bullets vs my players
        this.checkPlayerCollisions(dt);
        this.checkBaseCollisions(dt);
        this.checkPlayerBullets();
        this.managePlayers();
        //emit new list to other client
    },
    checkPlayerBullets: function () {
        //check enemy characters against my bullets
        for (var i = this.enemyCharacters.length - 1; i >= 0; i--) {
            for (var j = this.myTurret.bullets.length - 1; j >= 0; j--) {
                var box = {
                    pos: this.enemyCharacters[i].position,
                    width: this.enemyCharacters[i].width,
                    height: this.enemyCharacters[i].height
                };
                var ball = {
                    pos: this.myTurret.bullets[j].position,
                    rad: 10
                }
                if (RectCircleCollision(box, ball)) {
                    this.enemyCharacters[i].health -= this.myTurret.bullets[j].damage;
                    this.myTurret.bullets.splice(j, 1);
                    if (this.enemyCharacters[i].health <= 0) {
                        this.myCurrency += Math.floor(this.enemyCharacters[i].value * .7);
                        this.enemyCharacters.splice(i, 1);
                    }
                    break;
                }
            }
        }
        //check my characters against enemy bulelts
        for (var i = this.myCharacters.length - 1; i >= 0; i--) {
            for (var j = this.enemyTurret.bullets.length - 1; j >= 0; j--) {
                var box = {
                    pos: this.myCharacters[i].position,
                    width: this.myCharacters[i].width,
                    height: this.myCharacters[i].height
                };
                var ball = {
                    pos: this.enemyTurret.bullets[j].position,
                    rad: 10
                }
                if (RectCircleCollision(box, ball)) {
                    this.myCharacters[i].health -= this.enemyTurret.bullets[j].damage;
                    this.enemyTurret.bullets.splice(j, 1);
                    if (this.myCharacters[i].health <= 0) {
                        this.enemyCurrency += Math.floor(this.myCharacters[i].value * .7);
                        this.myCharacters.splice(i, 1);
                    }
                    break;
                }
            }
        }
    },
    //check player collisions
    checkPlayerCollisions: function (dt) {
        //reset collisions
        for (var i = this.myCharacters.length - 1; i >= 0; i--) {
            this.myCharacters[i].isColliding = false;
            this.myCharacters[i].inRange = false;
            if (i > 0) {
                if (HorizontalCollision(this.myCharacters[i], this.myCharacters[i - 1]))
                    this.myCharacters[i].isColliding = true;
            }
            if(!this.myCharacters[i].ranged) continue;
            if(getMagnitude2({
                x: (this.enemyBase.position.x) - this.enemyBase.imageWidth / 2, 
                y: this.enemyBase.position.y}, this.myCharacters[i].position) < this.myCharacters[i].range){
                this.myCharacters[i].inRange = true;
            }
            //check for collions with my character bullets and enemies
            for(var j = this.myCharacters[i].bullets.length - 1; j >= 0; j--){
                var destroyed = false;
                for(var n = this.enemyCharacters.length - 1; n >= 0; n--){
                    if(HorizontalCollision(this.enemyCharacters[n], this.myCharacters[i].bullets[j])){
                        this.enemyCharacters[n].health -= this.myCharacters[i].bullets[j].damage;
                        this.myCharacters[i].bullets.splice(j, 1);
                        destroyed = true;
                        if (this.enemyCharacters[n].health <= 0) {
                            this.myCurrency += this.enemyCharacters[n].value;
                            this.enemyCharacters.splice(n, 1);
                        }
                        break;
                    }
                }
                if(destroyed) continue;
                //check for collions with bases
                if(HorizontalCollision(this.enemyBase, this.myCharacters[i].bullets[j])){
                    this.enemyBase.health -= this.myCharacters[i].bullets[j].damage;
                    this.myCharacters[i].bullets.splice(j, 1);
                    // if (this.enemyBase.health <= 0) {
                    //     sendOver(false);
                    // }
                    break;
                }
            }
        }
        //reset enemy collisions
        for (var n = this.enemyCharacters.length - 1; n >= 0; n--) {
            this.enemyCharacters[n].isColliding = false;
            this.enemyCharacters[n].inRange = false;
            if (n > 0) {
                if (HorizontalCollision(this.enemyCharacters[n], this.enemyCharacters[n - 1]))
                    this.enemyCharacters[n].isColliding = true;
            }
            if(!this.enemyCharacters[n].ranged) continue;
            if(getMagnitude2({
                x: this.myBase.position.x + this.myBase.imageWidth / 2, 
                y: this.myBase.position.y}, this.enemyCharacters[n].position) < this.enemyCharacters[n].range){
                this.enemyCharacters[n].inRange = true;
            }
            //check for collions with enemy bullets and my characters
            for(var j = this.enemyCharacters[n].bullets.length - 1; j >= 0; j--){
                var destroyed = false;
                for (var i = this.myCharacters.length - 1; i >= 0; i--) {
                    if(HorizontalCollision(this.myCharacters[i], this.enemyCharacters[n].bullets[j])){
                        this.myCharacters[i].health -= this.enemyCharacters[n].bullets[j].damage;
                        this.enemyCharacters[n].bullets.splice(j, 1);
                        destroyed = true;
                        if (this.myCharacters[i].health <= 0) {
                            this.enemyCurrency += this.myCharacters[i].value;
                            this.myCharacters.splice(i, 1);
                            return;
                        }
                        break;
                    }
                }
                if(destroyed) continue;
                //check for collision with enemy bullets and my base
                if(HorizontalCollision(this.myBase, this.enemyCharacters[n].bullets[j])){
                    this.myBase.health -= this.enemyCharacters[n].bullets[j].damage;
                    this.enemyCharacters[n].bullets.splice(j, 1);
                    // if (this.myBase.health <= 0) {
                    //     sendOver(true);
                    // }
                    break;
                }                
            }
        }
        for (var i = this.myCharacters.length - 1; i >= 0; i--) {
            for (var n = this.enemyCharacters.length - 1; n >= 0; n--) {
                //check if ranged characters are in range of thing to shoot
                if(this.myCharacters[i].ranged){
                    if(getMagnitude2(this.enemyCharacters[n].position, this.myCharacters[i].position)
                    < this.myCharacters[i].range){
                        this.myCharacters[i].inRange = true;
                        this.myCharacters[i].isColliding = true;
                    }
                }
                //check if enemy ranged units are in range of thing to shoot
                if(this.enemyCharacters[n].ranged){
                    if(getMagnitude2(this.enemyCharacters[n].position, this.myCharacters[i].position)
                    < this.enemyCharacters[n].range){
                        this.enemyCharacters[n].inRange = true;
                        this.enemyCharacters[n].isColliding = true;
                    }
                }
                //myCharacters Colliding with Enemy Charcters
                if (HorizontalCollision(this.myCharacters[i], this.enemyCharacters[n])) {
                    this.myCharacters[i].isColliding = true;
                    this.enemyCharacters[n].isColliding = true;

                    //deal damage
                    if(!this.enemyCharacters[n].ranged){
                        this.myCharacters[i].health -= this.enemyCharacters[n].damage * dt;
                    }
                    if(!this.myCharacters[i].ranged){
                        this.enemyCharacters[n].health -= this.myCharacters[i].damage * dt;
                    }

                    //check for death
                    if (this.myCharacters[i].health <= 0) {
                        this.enemyCurrency += this.myCharacters[i].value;
                        this.myCharacters.splice(i, 1);
                    }
                    if (this.enemyCharacters[n].health <= 0) {
                        this.myCurrency += this.enemyCharacters[n].value;
                        this.enemyCharacters.splice(n, 1);
                    }
                    break;
                }
            }
        }
    },
    //check players colliding with base
    checkBaseCollisions: function (dt) {
        for (var i = 0; i < this.myCharacters.length; i++) {
            //Players colliding with enemy Base
            if (HorizontalCollision(this.myCharacters[i], this.enemyBase)) {
                //console.log("Hey, we're killing their base");
                //for now, just kill the character and do some damage to the base
                if (this.myCharacters[i]) {
                    this.enemyBase.takeDamage(this.myCharacters[i].damage * dt);
                    this.myCharacters[i].isColliding = true;
                }

                //End game if players health drops below 0
                // if (this.enemyBase.health <= 0) {
                //     sendOver(false);
                // }
            }
        }
        for (var n = 0; n < this.enemyCharacters.length; n++) {
            //Enemies colliding with my Base
            if (HorizontalCollision(this.enemyCharacters[n], this.myBase)) {
                //console.log("My base is under attack!");
                if (this.enemyCharacters[i]) {
                    this.myBase.takeDamage(this.enemyCharacters[n].damage * dt);
                    this.enemyCharacters[i].isColliding = true;
                }

                //End game if players health drops below 0
                // if (this.myBase.health <= 0) {
                //     sendOver(true);
                // }
            }
        }
    },
    //bound players to screen
    managePlayers: function () {
        for (var i = 0; i < this.myCharacters.length; i++) {
            if (this.myCharacters[i].position.x > 800) {
                //console.log("character off screen");
                this.myCharacters.splice(i, 1);
                i--;
            }
        }
        for (var n = 0; n < this.enemyCharacters.length; n++) {
            if (-this.enemyCharacters[n].position.x < -800) {
                //console.log("Enemy off screen");
                this.enemyCharacters.splice(n, 1);
                n--;
                //doesnt work because enemies are updated from other client
            }
        }
    },
    //call all draw calls
    draw: function (ctx) {
        var background = document.getElementById('background');
        //draw our background image
        ctx.drawImage(
            background,
            -background.width / 2, -background.height / 2
        );
        if (!app.main.host) {
            this.drawHostCharacters(ctx);
        } else {
            this.drawCharacters(ctx);
        }

        this.myBase.draw(ctx);
        this.enemyBase.draw(ctx, true);

        if (app.main.host) {
            this.myTurret.drawBullets(ctx);
            this.enemyTurret.drawBullets(ctx, true);
        } else {
            //non-host objects have no draw function, use prebuilt function in this.js
            for (var i = 0; i < this.myBullets.length; i++) {
                this.doNonHostDraw(ctx, this.myBullets[i], getBullet(this.myBullets[i].imageNum), false, true);
            }
            for (var i = 0; i < this.enemyBullets.length; i++) {
                this.doNonHostDraw(ctx, this.enemyBullets[i], getBullet(this.enemyBullets[i].imageNum), true, true);
            }
        }

        this.myTurret.draw(ctx);
        this.enemyTurret.draw(ctx, true);

        //debug square
        // ctx.save();
        // ctx.fillStyle = '#f00'
        // ctx.fillRect(
        //     this.enemyTurret.position.x,
        //     this.enemyTurret.position.y,
        //     10,10
        // );
        // ctx.restore();
    },
    //draw characters and their bullets 
    drawCharacters: function (ctx) {
        for (var i = 0; i < this.myCharacters.length; i++) {
            if(this.myCharacters[i].ranged) this.myCharacters[i].drawBullets(ctx);
            this.myCharacters[i].draw(ctx);
        }
        for (var i = 0; i < this.enemyCharacters.length; i++) {
            if(this.enemyCharacters[i].ranged) this.enemyCharacters[i].drawBullets(ctx);
            this.enemyCharacters[i].draw(ctx, true);
        }
    },
    //draw the characters the host has
    drawHostCharacters: function (ctx) {
        for (var i = 0; i < this.myCharacters.length; i++) {
            this.doNonHostDraw(ctx, this.myCharacters[i], getCharacter(this.myCharacters[i].imageNum));
            if(this.myCharacters[i].ranged){
                for(var j = 0; j < this.myCharacters[i].bullets.length; j++){
                    this.doNonHostDraw(ctx, this.myCharacters[i].bullets[j], getBullet(this.myCharacters[i].bullets[j].imageNum));
                }
            }
        }
        for (var i = 0; i < this.enemyCharacters.length; i++) {
            this.doNonHostDraw(ctx, this.enemyCharacters[i], getCharacter(this.enemyCharacters[i].imageNum), true);
            if(this.enemyCharacters[i].ranged){
                for(var j = 0; j < this.enemyCharacters[i].bullets.length; j++){
                    this.doNonHostDraw(ctx, this.enemyCharacters[i].bullets[j], getBullet(this.enemyCharacters[i].bullets[j].imageNum));
                }
            }
        }
    },
    //prebuilt draw function for non-host who has no draw functions attached to their objects
    doNonHostDraw(ctx, obj, image, flip, vertFlip) {
        ctx.save();

        var rot = obj.rotation || 0;
        var scale = obj.scale || 1;
        var swap = 1;
        var vertSwap = 1;
        if (flip) swap = -1;
        if (vertFlip) vertSwap = -1;

        rot = (obj.rotation * Math.PI) / 180;  //convert rotation to radians

        ctx.scale(scale * swap, scale);
        ctx.translate(obj.position.x / (scale * -swap), obj.position.y / (scale));
        ctx.rotate(rot);

        ctx.drawImage(
            image,
            -(obj.imageWidth / 2),
            -(obj.imageHeight / 2)
        );

        ctx.restore();
    },
    drawUI: function (ctx) {
        //default "should we draw something different?" values
        var regOverride = false;
        var speedOverride = false;
        var rangeOverride = false;
        var tankOverride = false;
        var baseOverride = false;

        //check if button is hovered or disabled
        if (this.myCurrency - this.charRegCost < 0) { regOverride = `btn_char_reg_disabled`; }
        else if (this.makeCharacterButton.hover(true)) { regOverride = `btn_char_reg_active`; }

        if (this.myCurrency - this.charSpeedCost < 0) { speedOverride = `btn_char_speed_disabled`; }
        else if (this.makeSpeedCharButton.hover(true)) { speedOverride = `btn_char_speed_active`; }

        if (this.myCurrency - this.charRangeCost < 0) { rangeOverride = `btn_char_range_disabled`; }
        else if (this.makeRangedCharButton.hover(true)) { rangeOverride = `btn_char_range_active`; }

        if (this.myCurrency - this.charTankCost < 0) { tankOverride = `btn_char_tank_disabled`; }
        else if (this.makeBigCharButton.hover(true)) { tankOverride = `btn_char_tank_active`; }

        if (this.myBase.level < 3) {
            if (this.myCurrency - this.baseCost[this.myBase.level] < 0) { baseOverride = `btn_base_0${this.myBase.level + 1}_disabled`; }
            else if (this.upgradeBaseButton.hover(true)) { baseOverride = `btn_base_0${this.myBase.level + 1}_active`; }
        }


        //draw calls
        this.makeCharacterButton.draw(ctx, false, regOverride);
        if (regOverride) this.regCostText.draw(ctx);

        this.makeSpeedCharButton.draw(ctx, false, speedOverride);
        if (speedOverride) this.speedCostText.draw(ctx);

        this.makeRangedCharButton.draw(ctx, false, rangeOverride);
        if (rangeOverride) this.rangeCostText.draw(ctx);

        this.makeBigCharButton.draw(ctx, false, tankOverride);
        if (tankOverride) this.tankCostText.draw(ctx);

        if (this.myBase.level < 3) {
            this.upgradeBaseButton.draw(ctx, false, baseOverride);
            if (baseOverride) this.baseCostText.draw(ctx);
        }

        //draw HUD
        ctx.save();
        ctx.scale(.521, .521);
        ctx.drawImage(
            document.getElementById('HUD'),
            -14, -55
        );
        ctx.restore();

        //draw players health
        this.myBase.drawHealth(ctx);
        this.enemyBase.drawHealth(ctx, true);

        //update and draw currency
        this.currencyText.text = `${this.myCurrency}`;
        this.currencyText.draw(ctx);
    }
}