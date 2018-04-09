function characterObject(image, position, speed){
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;  
    this.speed = speed || 0;   
}
characterObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.update = function(dt){
    if(!dt || dt === undefined) return;
    this.position.x += this.speed * dt;
}