function baseObject(image, position, scale){
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;  
    this.rotation = 0;
    this.health = 100;
    this.scale = scale || 1;
}
baseObject.prototype = Object.create(gameObject.prototype);