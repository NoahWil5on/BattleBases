function bulletObject(image, damage, rotation, velocity, position, speed, scale, direction){
    this.imageNum = image;
    this.image = getBullet(this.imageNum);
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
    this.rotation = rotation || 0;
    this.velocity = velocity;
    this.lifeTime = 0;
}
bulletObject.prototype = Object.create(gameObject.prototype);
bulletObject.prototype.update = function(dt){
    this.lifeTime += dt;
    if(!dt || dt === undefined || this.isColliding) return;
    this.position.x += this.velocity.x * (this.speed * this.direction) * dt;
    this.position.y += this.velocity.y * (this.speed * this.direction) * dt * this.direction;
}