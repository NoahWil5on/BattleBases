"use strict"

var app = app || {};

app.start = {
    readyButtonUp: undefined,
    readyButtonDown: undefined,
    isReadyDown: false,
    wasReadyDown: false,

    init: function(){                
        this.makeButtons();	
    },
    makeButtons: function(){
        var x = (app.main.WIDTH / 2);
        var y = (app.main.HEIGHT / 2);

        this.readyButtonUp = new buttonObject ('02', {x, y}, .2);
        this.readyButtonDown = new buttonObject ('03', {x, y}, .2);
    },
    update: function(dt, ctx){
        this.updateReadyButton();
        this.draw(ctx);
    },
    updateReadyButton: function(){
        this.isReadyDown = this.readyButtonUp.hold(true);
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
        let button = this.readyButtonUp;
        if(this.isReadyDown) button = this.readyButtonDown;
        button.draw(ctx);
	}
}