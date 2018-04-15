"use strict"

var app = app || {};

app.game = {
    myCharacters: [],
    enemyCharacters: [],
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
            .1);	                //position
    },
    update: function(dt, ctx){
        this.updateCharacters(dt);
        this.updateButtons();

        this.draw(ctx);
        if(app.main.host){
            this.updateCollisions();
        }
        sendMyData();
    },
    updateCharacters: function(dt){
        for(var i = 0; i < this.myCharacters.length; i++){
            this.myCharacters[i].update(dt);
        }
    },
    updateButtons: function(){
        if(this.makeCharacterButton.clicked(true)){
            var charPos = JSON.parse(JSON.stringify(this.myBase.position))
            charPos.y += 20;
            this.myCharacters.push(new characterObject(
                '01',     
                charPos,          
                100,
                .15
            ));
        }
    },
    updateCollisions: function(){
        //my players vs enemy players
        //my players vs enmey base
        //enemy players vs my base
        /********************* */
        //my turret bullets vs enemy players
        //enemy turret bullets vs my players
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
        for(var i = 0; i < this.enemyCharacters.length; i++){
            this.drawEnemy(this.enemyCharacters[i], ctx);
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
        ctx.translate(obj.position.x / scale, obj.position.y / scale )

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