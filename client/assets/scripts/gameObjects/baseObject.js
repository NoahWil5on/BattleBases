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
}
baseObject.prototype.AddTurret = function () {
    this.turretCount++;
    //place a turret, y coordinate dependent on the count
}