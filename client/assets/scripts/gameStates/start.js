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
    //make ready buttons
    makeButtons: function(){
        var x = (app.main.WIDTH / 2);
        var y = (app.main.HEIGHT * (8 / 9));

        this.readyButtonUp = new buttonObject (`menu?play?`, {x, y}, 1);
        this.readyButtonDown = new buttonObject ('menu?play?active', {x, y}, 1);
    },
    //update buttons and draw
    update: function(dt, ctx){
        this.updateReadyButton();
        this.draw(ctx);
        this.isHover = false;
    },
    //check for hover and butotn click
    updateReadyButton: function(){
        this.isReadyDown = this.readyButtonUp.hold(true);
        this.isHover = this.readyButtonUp.hover(true);

        //do join server if click
        if(this.wasReadyDown && !this.isReadyDown){
            app.main.currentGameState = app.main.gameState.LOBBY;
            joinServer();
        }
        this.wasReadyDown = this.isReadyDown;
    },
    draw: function(ctx){
		this.drawReady(ctx);
    },
    //draw hover if hover else draw reg button
	drawReady: function(ctx) {
        //draw background_start
        ctx.drawImage(this.background,-5,-30);
        let button = this.readyButtonUp;
        if(this.isHover) button = this.readyButtonDown;
        button.draw(ctx);
	}
}