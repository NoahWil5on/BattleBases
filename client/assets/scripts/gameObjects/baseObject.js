//constructor
function baseObject(image, position, scale){
    this.imageNum = image;
    this.image = getBase(this.imageNum);
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    this.width = this.imageWidth * scale;
    this.height = this.imageHeight * scale;
    this.position = position;  
    this.rotation = 0;
    this.health = 100;
    this.scale = scale || 1;
    this.turretCount = 0;
    this.level = 1;
}
baseObject.prototype = Object.create(gameObject.prototype);

//apply damage
baseObject.prototype.takeDamage = function(damage){
	//If the character is colliding with another character, he shouldnt move.
    if(!damage || damage === undefined) return;
    this.health -= damage;
}
baseObject.prototype.AddTurret = function () {
    this.turretCount++;
    //place a turret, y coordinate dependent on the count
}
//draw the health in UI
baseObject.prototype.drawHealth = function (ctx, enemy) {
    ctx.save();

    //background bar
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.position.x - 50, this.position.y + 100, 100, 25);

    //filled bar, determined by starting health
    var x = 15;
    var width = 147;
    if(enemy){
        x = app.main.WIDTH - 177.5 + width - (width * (this.health / 100));
    }
    ctx.fillStyle = "#64E264";
    ctx.fillRect(x, 63, width * (this.health / 100), 24);

    ctx.restore();
}