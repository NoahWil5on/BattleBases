function characterObject(image, position, speed, health, damage, scale, direction){
    this.imageNum = image;
    this.image = getCharacter(this.imageNum);
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    this.width = this.imageWidth * scale;
    this.height = this.imageHeight * scale;
    this.position = position;  
    this.rotation = 0;
    this.speed = speed || 0;
    this.direction = direction || 1;   
    this.scale = scale || 1;
    this.id = `${Date.now()}`;
    this.isColliding = false;
    this.damage = damage || 10;
    this.health = health;
}
characterObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.update = function(dt){
	//If the character is colliding with another character, he shouldnt move.
    if(!dt || dt === undefined || this.isColliding) return;
    this.position.x += (this.speed * this.direction) * dt;
}