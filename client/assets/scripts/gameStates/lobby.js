"use strict"

var app = app || {};

app.lobby = {
    init: function(){           
    },
    update: function(dt, ctx){
        this.draw(ctx);
    },
    draw: function(ctx){
		ctx.fillRect(
            10,10,50,50
        );
    },
}