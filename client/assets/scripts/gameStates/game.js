"use strict"

var app = app || {};

app.game = {
    myCharacter: undefined,
    makeCharacterButton: undefined,

    init: function(){
        //make character
        this.myCharacter = new characterObject(
            getCharacter("01"),     //image
            {x: 0, y: 0},           //position
            200,
            .2);                   //speed (units/seconds)

        //button stuff
        var button = getButton("01");

        //adjusting position for scale I'll be doing to this object
        var x = (button.width / 2) * .2;
        var y = (button.height / 2) * .2;
		this.makeCharacterButton = new buttonObject (
			getButton("01"),		//image
            {x: x, y: y},
            .2);	                //position
    },
    update: function(dt, ctx){
        this.myCharacter.update(dt);  //update character
        this.makeCharacterButton.hover();

        this.draw(ctx);
        if(app.main.host){
            this.updateCollisions();
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
        this.drawCharacter(ctx);
    },
    drawCharacter: function(ctx){
        this.myCharacter.draw(ctx);  //draw character
    },
	drawUI: function(ctx) {
		this.makeCharacterButton.draw(ctx); //draw the button used to make our character
	}
}