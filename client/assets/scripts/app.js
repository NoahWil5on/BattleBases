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
    

    //intialize fields, most imporantly reset key values to reset the game
    init: function(player){
        //setup canvas
        this.canvas = document.getElementById('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;

        this.myUpdate = this.update.bind(this);
        this.myUpdate();
    },
    //route update calls depending on game state and updates various things
    update: function(delta){
        this.dt = (delta -this.lastUpdate) / 1000;
        //clear screen
        this.clear();

        //bind update to constant frame updates
        this.animationID = requestAnimationFrame(this.myUpdate);

        this.lastUpdate = delta;

    },
    //clear screen each frame
    clear: function(){
        this.ctx.save();
        this.ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);

        this.ctx.restore();
    }
}