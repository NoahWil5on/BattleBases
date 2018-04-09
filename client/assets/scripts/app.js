"use strict";

//create or add to app
var app = app || {};

app.main = {

    //all app.main fields
    canvas: undefined,
    ctx: undefined,
    WIDTH: 1000,
    HEIGHT: 600,
    dt: 0,
    lastUpdate: Date.now(),
    cameraPosition: {x: 100, y: 0},
    gameState: {
        START: 0,
        LOBBY: 1,
        GAME: 2,
        OVER: 3,
    },
    currentGameState: undefined,    

    //intialize fields, most imporantly reset key values to reset the game
    init: function(player){
        this.currentGameState = this.gameState.GAME;

        //setup canvas
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.ctx = this.canvas.getContext('2d');

        app.game.init();

        this.myUpdate = this.update.bind(this);
        this.myUpdate();
    },
    //route update calls depending on game state and updates various things
    update: function(delta){
        this.dt = (delta -this.lastUpdate) / 1000;
        this.clear();
        //bind update to constant frame updates
        this.animationID = requestAnimationFrame(this.myUpdate);

        //only update the current gamestate
        switch(this.currentGameState){
            case this.gameState.START:
                break;
            case this.gameState.LOBBY:
                break;
            case this.gameState.GAME:
                this.ctx.save();
                //move canvas to camera position
                this.ctx.translate(
                    -this.cameraPosition.x + app.main.WIDTH / 2,
                    -this.cameraPosition.y + app.main.HEIGHT / 2
                );
                app.game.update(this.dt, this.ctx);
                this.ctx.restore();
                break;
            case this.gameState.OVER:
                break;
            default: break;
        }

        this.lastUpdate = delta;
    },
    //called once a frame to wipe canvas
    clear: function(){
        this.ctx.save();

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);

        this.ctx.restore();
    }
}