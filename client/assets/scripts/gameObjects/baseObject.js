function baseObject(image, position, scale){
    this.imageNum = image;
    this.image = getGeneralObject(this.imageNum);
    this.width = this.image.width;
    this.height = this.image.height;
    this.position = position;  
    this.rotation = 0;
    this.health = 100;
    this.scale = scale || 1;
    this.turretCount = 0;
}
baseObject.prototype = Object.create(gameObject.prototype);
baseObject.prototype.takeDamage = function(damage){
	//If the character is colliding with another character, he shouldnt move.
    if(!damage || damage === undefined) return;
    this.health -= damage;

    //End game if players health drops below 0
    if (this.health <= 0) {
        app.main.currentGameState = app.main.gameState.OVER;
    }
}
baseObject.prototype.AddTurret = function () {
    this.turretCount++;
    //place a turret, y coordinate dependent on the count
}

baseObject.prototype.drawHealth = function (ctx) {
    ctx.save();

    //background bar
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x - 50, this.position.y + 100, 100, 25);

    //filled bar, determined by starting health
    ctx.fillStyle = "green";
    ctx.fillRect(this.position.x - 50, this.position.y + 102, 100 * (this.health / 100), 21);

    ctx.restore();
}