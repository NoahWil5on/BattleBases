"use strict"

var app = app || {};

app.lobby = {
    waiting: undefined,
    background: undefined,
    dotCount: 0,
    dotTimer: 0,
    waitText: 'Waiting for another player',

    //set up waiting text
    init: function(){    
        this.background = document.getElementById('background_lobby');
        this.waiting = new textObject(
            this.waitText,    //text
            {x: app.main.WIDTH / 2,             //position
            y: app.main.HEIGHT / 2},
            '#000',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '48'                                //size
        );
    },
    //update animated ellipses
    update: function(dt, ctx){
        this.dotTimer += dt;
        if(this.dotTimer > .3){
            this.dotTimer = 0
            this.dotCount ++;
        }
        this.dotCount %= 5;
        this.draw(ctx);
    },
    draw: function(ctx){
        var toWrite = this.waitText
        //add periods to the end of "waiting"
        for(var i = 0; i < this.dotCount; i++){
            toWrite = `${toWrite}.`
        }
        this.waiting.text = toWrite;
        
        //draw background
        ctx.drawImage(this.background,-5,-30);
		this.waiting.draw(ctx);
    },
}