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
    host: false,
    currentGameState: undefined,    
    mouse: {x: 0, y: 0},
    mouseDown: false,

    //intialize fields, most imporantly reset key values to reset the game
    init: function(player){
        this.currentGameState = this.gameState.START;

        //setup canvas
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        this.ctx = this.canvas.getContext('2d');

        app.start.init();
        app.lobby.init();
        app.game.init();
        app.over.init();

        this.myUpdate = this.update.bind(this);
        this.myUpdate();

        window.addEventListener('mousemove', function(event) {
            app.main.mouse = getMousePos(this.canvas, event);
        }, false);
        window.addEventListener('mousedown', function(event) {
            app.main.mouseDown = true;
        }, false);
        window.addEventListener('mouseup', function(event) {
            app.main.mouseDown = false;
        }, false);
    },
    //route update calls depending on game state and updates various things
    update: function(delta){
        app.main.canvas.style.cursor = 'auto';
        this.dt = (delta -this.lastUpdate) / 1000;
        this.clear();
        //bind update to constant frame updates
        this.animationID = requestAnimationFrame(this.myUpdate);

        this.ctx.save();
        

        //only update the current gamestate
        switch(this.currentGameState){
            case this.gameState.START:
                app.start.update(this.dt, this.ctx);
                break;
            case this.gameState.LOBBY:
                app.lobby.update(this.dt, this.ctx);
                break;
            case this.gameState.GAME:
                this.cameraMove();
                this.ctx.save();
                //move canvas to camera position
                this.ctx.translate(
                    -this.cameraPosition.x + app.main.WIDTH / 2,
                    -this.cameraPosition.y + app.main.HEIGHT / 2
                );
                app.game.update(this.dt, this.ctx);
                this.ctx.restore();
                app.game.drawUI(this.ctx);
                break;
            case this.gameState.OVER:
                app.over.update(this.dt, this.ctx);
                break;
            default: break;
        }
        this.ctx.restore();

        this.lastUpdate = delta;
    },
    cameraMove: function(){
        
    },
    //called once a frame to wipe canvas
    clear: function(){
        this.ctx.save();

        this.ctx.fillStyle = "#fff";
        this.ctx.fillRect(0,0,this.WIDTH,this.HEIGHT);

        this.ctx.restore();
    }
}