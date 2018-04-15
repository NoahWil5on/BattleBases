"use strict"

var app = app || {};

app.lobby = {
    waiting: undefined,
    init: function(){    
        this.waiting = new textObject(
            'Waiting for another player...',    //text
            {x: app.main.WIDTH / 2,             //position
            y: app.main.HEIGHT / 2},
            '#000',                             //color
            'center',                           //text align
            'sans-serif',                       //font
            '16'                                //size
        );
    },
    update: function(dt, ctx){
        this.draw(ctx);
    },
    draw: function(ctx){
		this.waiting.draw(ctx);
    },
}