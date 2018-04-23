"use strict"

var app = app || {};

app.game = {
    myCharacters: [],
    enemyCharacters: [],
    myTurretTargets: [],
    enemyTurretTargets: [],
    myBase: undefined,
    enemyBase: undefined,
    makeCharacterButton: undefined,

    init: function(){
        //make base
        var base = getGeneralObject('base');
        var basePos = {
            x: ((base.width / 2) * .5) - (app.main.worldSize.width / 2),
            y: 100}; 
        var enemyBasePos = JSON.parse(JSON.stringify(basePos));
        this.myBase = new baseObject(
            'base',
            basePos,
            .5
        );
        this.enemyBase = new baseObject(
            'base',
            basePos,
            .5
        )


        //button stuff
        var button = getButton("01");
        //adjusting position for scale I'll be doing to this object
        var charButtonPos = {
            x: (button.width / 2) * .1,
            y: (button.height / 2) * .1}; 

		this.makeCharacterButton = new buttonObject (
			'01',		//image
            charButtonPos,
            .1);	    //position

    },
    update: function(dt, ctx){
        this.updateCharacters(dt);
        this.updateButtons();

        this.draw(ctx);
        if(app.main.host){
            this.updateCollisions();
        }
        //sendMyData();
    },
    updateCharacters: function(dt){
        for(var i = 0; i < this.myCharacters.length; i++){
            this.myCharacters[i].update(dt);
        }
        //if enemy characters exist
        if (typeof enemyCharacters != 'undefined') {
            for (var i = 0; i < this.enemyCharacters.length; i++) {
                this.enemyCharacters[i].update(dt);
            }
        }
    },
    updateButtons: function(){
        if (this.makeCharacterButton.clicked(true)) {
            if (app.main.host) {
                var charPos = JSON.parse(JSON.stringify(this.myBase.position))
                charPos.y += 20;
                this.myCharacters.push(new characterObject(
                    '01',
                    charPos,
                    100,
                    .15,
                    1
                ));
            } else {
                //theyre the other player, 
                //emit an enemy created to the host
                sendHostNewCharacter();
            }

        }
    },
    updateCollisions: function(){
        //my players vs enemy players
        //my players vs enmey base
        //enemy players vs my base
        /********************* */
        //my turret bullets vs enemy players
        //enemy turret bullets vs my players
        this.checkPlayerCollisions();
        //this.checkBaseCollisions();
        this.checkPlayersInTurretRange();
        this.managePlayers();
        //emit new list to other client
    },
	checkPlayerCollisions: function() {
		for (var i = 0; i < this.myCharacters.length; i++) {
			for (var n = 0; n < this.enemyCharacters.length; n++) {
                //myCharacters Colliding with Enemy Charcters
				if (HorizontalCollision(this.myCharacters[i],this.enemyCharacters[n])) {
                    this.myCharacters[i].isColliding = true;
                    this.enemyCharacters[n].isColliding = true;
                    console.log("characters Colliding");
                }
			}
		}
    },
    checkBaseCollisions: function() {
        for (var i = 0; i < this.myCharacters.length; i++) {
            //Players colliding with enemy Base
            if (HorizontalCollision(this.myCharacters[i], this.enemyBase)) {
                console.log("Hey, we're killing their base");
            }
        }
        for (var n = 0; n < this.enemyCharacters.length; n++) {
            //Enemies colliding with my Base
            if (HorizontalCollision(this.enemyCharacters[n], this.myBase)) {
                console.log("My base is under attack!");
            }
        }
    },
    checkPlayersInTurretRange: function() {
        for (var i = 0; i < this.myCharacters.length; i++) {
            //My players in range of enemy turrets, and does not already exist in the Target array
            if (this.myCharacters[i].position.x > (-this.enemyBase.position.x - 300)) {
                console.log("Friendly in enemy turret range");
            }
        }
        for (var n = 0; n < this.enemyCharacters.length; n++) {
            if (-this.enemyCharacters[n].position.x < (this.myBase.position.x + 300)) {
                console.log("Enemy in friendly turret range");
            }
        }
    },
	checkTurretCollisions: function() {
		
    },
    //currently delete characters when they get off screen
    //will be used to handle deaths
    managePlayers: function() {
        for (var i = 0; i < this.myCharacters.length; i++) {
            if (this.myCharacters[i].position.x > 800) {
                console.log("character off screen");
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
    draw: function(ctx){
        this.drawCharacters(ctx);

        this.myBase.draw(ctx);
        this.enemyBase.draw(ctx, true);
    },
    drawCharacters: function(ctx){
        for(var i = 0; i < this.myCharacters.length; i++){
            this.myCharacters[i].draw(ctx);
        }
        for (var i = 0; i < this.enemyCharacters.length; i++){
            this.enemyCharacters[i].draw(ctx);
            //this.drawEnemy(this.enemyCharacters[i], ctx);
        }
    },
    drawEnemy: function(obj, ctx){
        ctx.save();

        //not all objects will have rotation, if not then set rotation to 0
        var rot = obj.rotation || 0;        
        var scale = obj.scale || 1;   
        var swap = -1;
        rot = (obj.rotation * Math.PI) / 180;  //convert rotation to radians

        ctx.rotate(rot);
        ctx.scale(scale * swap,scale);
        ctx.translate(obj.position.x / scale, obj.position.y / scale );

        ctx.drawImage(
            getCharacter(obj.imageNum),
            -(obj.width / 2),
            -(obj.height / 2)
        );

        ctx.restore();
    },
	drawUI: function(ctx) {
		this.makeCharacterButton.draw(ctx); //draw the button used to make our character
	}
}