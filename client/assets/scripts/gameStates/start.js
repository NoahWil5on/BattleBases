"use strict"

var app = app || {};

app.start = {
    readyButtonUp: undefined,
    readyButtonDown: undefined,
    isReadyDown: false,
    isHover: false,
    wasReadyDown: false,
    background: undefined,

    init: function(){                
        this.makeButtons();
        this.background = document.getElementById('background_start');	
    },
    makeButtons: function(){
        var x = (app.main.WIDTH / 2);
        var y = (app.main.HEIGHT * (8 / 9));

        this.readyButtonUp = new buttonObject (`menu?play?`, {x, y}, 1);
        this.readyButtonDown = new buttonObject ('menu?play?active', {x, y}, 1);
    },
    update: function(dt, ctx){
        this.updateReadyButton();
        this.draw(ctx);
        this.isHover = false;
    },
    updateReadyButton: function(){
        this.isReadyDown = this.readyButtonUp.hold(true);
        this.isHover = this.readyButtonUp.hover(true);
        if(this.wasReadyDown && !this.isReadyDown){
            app.main.currentGameState = app.main.gameState.LOBBY;
            joinServer();
        }
        this.wasReadyDown = this.isReadyDown;
    },
    draw: function(ctx){
		this.drawReady(ctx);
    },
	drawReady: function(ctx) {
        ctx.drawImage(this.background,-5,-30);
        let button = this.readyButtonUp;
        if(this.isHover) button = this.readyButtonDown;
        button.draw(ctx);
	}
}