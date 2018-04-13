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
            200);                   //speed (units/seconds)
		this.makeCharacterButton = new buttonObject (
			getButton("01"),		//image
			{x: -330, y: -230});	//position
    },
    update: function(dt, ctx){
        this.myCharacter.update(dt);  //update character
        this.draw(ctx);
    },
    draw: function(ctx){
        this.drawCharacter(ctx);
		this.drawUI(ctx);
    },
    drawCharacter: function(ctx){
        this.myCharacter.draw(ctx);  //draw character
    },
	drawUI: function(ctx) {
		this.makeCharacterButton.draw(ctx); //draw the button used to make our character
	}
}