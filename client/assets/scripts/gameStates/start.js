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
        let buttonUp = getButton('02');
        let buttonDown = getButton('03');

        var x = (app.main.WIDTH / 2);
        var y = (app.main.HEIGHT / 2);

        this.readyButtonUp = new buttonObject (buttonUp, {x, y}, .2);
        this.readyButtonDown = new buttonObject (buttonDown, {x, y}, .2);
    },
    update: function(dt, ctx){
        this.updateReadyButton();
        this.draw(ctx);
    },
    updateReadyButton: function(){
        this.isReadyDown = this.readyButtonUp.clicked(true);
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