//character constructor
//image and speed are required
function characterObject(image, position, speed){
    if(arguments.length < 2) 
        throw new Error("Image and Position are necessary to make character");
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;  
    this.rotation = 0;
    this.speed = speed || 0;   
}
characterObject.prototype = Object.create(gameObject.prototype);
characterObject.prototype.update = function(dt){
    if(!dt || dt === undefined) return;
    this.position.x += this.speed * dt;
}