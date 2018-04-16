function characterObject(image, position, speed, scale){
    this.imageNum = image;
    this.image = getCharacter(this.imageNum);
    this.width = this.image.width;
    this.height = this.image.height;
    this.position = position;  
    this.rotation = 0;
    this.speed = speed || 0;
    this.direction = 1;   
    this.scale = scale || 1;
    this.id = `${Date.now()}`
    this.isColliding = false;
    this.attack = 10;
}
characterObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.update = function(dt){
	//If the character is colliding with another character, he shouldnt move.
    if(!dt || dt === undefined || this.isColliding) return;
    this.position.x += (this.speed * this.direction) * dt;
}