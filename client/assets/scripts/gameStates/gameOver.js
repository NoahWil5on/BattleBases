"use strict"

var app = app || {};

app.over = {
    winText: undefined,
    loseText: undefined,
    win: false,
    background: undefined,

    restartButton: undefined,
    restartButtonActive: undefined,
    isHover: false,
    isDown: false,
    wasDown: false,

    init: function(){ 
        this.background = document.getElementById('background_gameover');        
        this.winText = new textObject(
            'VICTORY',    //text
            {x: app.main.WIDTH * (3 / 10),             //position
                y: app.main.HEIGHT * (4 / 10)},
                '#000',                             //color
                'center',                           //text align
                'LuckiestGuy',                       //font
                '110'                               //size
        );  
        this.loseText = new textObject(
            'DEFEAT',    //text
            {x: app.main.WIDTH * (3 / 10),             //position
            y: app.main.HEIGHT * (4 / 10)},
            '#000',                             //color
            'center',                           //text align
            'LuckiestGuy',                       //font
            '110'                                //size
        );
        var y = app.main.HEIGHT * (3.5 / 10);
        var x = app.main.WIDTH * (7.8 / 10)
        this.restartButton = new buttonObject (`menu?restart?`, {x, y}, 1);
        this.restartButtonActive = new buttonObject ('menu?restart?active', {x, y}, 1);
    },
    update: function(dt, ctx){
        this.updateButtons();
        this.draw(ctx);
        this.isHover = false;
    },
    updateButtons: function(){
        this.isDown = this.restartButton.hold(true);
        this.isHover = this.restartButton.hover(true);
        if(this.wasDown && !this.isDown){
            window.location.href = window.location.href;
        }
        this.wasDown = this.isDown;
    },
    draw: function(ctx){
        ctx.drawImage(this.background, -5, -30);

        if(this.isHover) {this.restartButtonActive.draw(ctx);}
        else {this.restartButton.draw(ctx);}

        if(this.win){
            this.winText.draw(ctx);
        }else{
            this.loseText.draw(ctx);
        }
    },
}