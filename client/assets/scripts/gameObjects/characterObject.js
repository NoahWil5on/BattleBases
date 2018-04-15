function characterObject(image, position, speed, scale){
    this.imageNum = image;
    this.image = getCharacter(this.imageNum);
    this.width = this.image.width;
    this.height = this.image.height;
    this.position = position;  
    this.rotation = 0;
    this.speed = speed || 0;   
    this.scale = scale || 1;
    this.id = `${Date.now()}`
}
characterObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.update = function(dt){
    if(!dt || dt === undefined) return;
    this.position.x += (this.speed) * dt;
}