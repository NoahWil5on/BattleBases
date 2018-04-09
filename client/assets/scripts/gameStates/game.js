"use strict"

var app = app || {};

app.game = {
    myCharacter: undefined,

    init: function(){
        //make character
        this.myCharacter = new characterObject(
            getCharacter("01"),     //image
            {x: 0, y: 0},           //position
            200);                   //speed (units/seconds)
    },
    update: function(dt, ctx){
        this.myCharacter.update(dt);  //update character
        this.draw(ctx);
    },
    draw: function(ctx){
        this.drawCharacter(ctx);
    },
    drawCharacter: function(ctx){
        this.myCharacter.draw(ctx);  //draw character
    }
}