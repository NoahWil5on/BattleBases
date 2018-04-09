"use strict"

var app = app || {};

app.game = {
    myCharacter: undefined,

    init: function(){
        this.myCharacter = new characterObject(
            getCharacter("01"),     //image
            {x: 0, y: 0},           //position
            200);                   //speed
    },
    update: function(dt, ctx){
        this.myCharacter.update(dt);
        this.draw(ctx);
    },
    draw: function(ctx){
        this.drawCharacter(ctx);
    },
    drawCharacter: function(ctx){
        this.myCharacter.draw(ctx, this.myCharacter.rotation);
    }
}