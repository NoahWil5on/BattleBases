"use strict"

var app = app || {};

app.over = {
    winText: undefined,
    loseText: undefined,
    win: false,

    init: function(){         
        this.winText = new textObject(
            'VICTORY',    //text
            {x: app.main.WIDTH / 2,             //position
            y: app.main.HEIGHT / 2},
            '#000',                             //color
            'center',                           //text align
            'sans-serif',                       //font
            '32'                                //size
        );  
        this.loseText = new textObject(
            'DEFEAT',    //text
            {x: app.main.WIDTH / 2,             //position
            y: app.main.HEIGHT / 2},
            '#000',                             //color
            'center',                           //text align
            'sans-serif',                       //font
            '32'                                //size
        );
    },
    update: function(dt, ctx){
        this.draw(ctx);
    },
    draw: function(ctx){
        if(this.win){
            this.winText.draw(ctx);
        }else{
            this.loseText.draw(ctx);
        }
    },
}