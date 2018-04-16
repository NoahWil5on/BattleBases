function baseObject(image, position, scale){
    this.imageNum = image;
    this.image = getGeneralObject(this.imageNum);
    this.width = this.image.width;
    this.height = this.image.height;
    this.position = position;  
    this.rotation = 0;
    this.health = 100;
    this.scale = scale || 1;
}
baseObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.takeDamage = function(damage){
	//If the character is colliding with another character, he shouldnt move.
    if(!damage || damage === undefined) return;
    this.health -= damage;
}