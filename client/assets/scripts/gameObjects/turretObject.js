function turretObject(image, bulletType, range, damage, fireRate, position, rotation, scale, direction){
    this.imageNum = image;
    this.bulletType = bulletType;
    this.image = getTurret(this.imageNum);
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    this.width = this.imageWidth * scale;
    this.height = this.imageHeight * scale;
    this.position = position;  
    this.rotation = 0;
    this.direction = direction || 1;   
    this.scale = scale || 1;
    this.id = `${Date.now()}`;
    this.isColliding = false;
    this.damage = damage || 10;
    this.range = range;
    this.target = undefined;
    this.fireRate = fireRate;
    this.fireTimer = 0;
    this.bullets = [];
}
turretObject.prototype = Object.create(gameObject.prototype);
turretObject.prototype.update = function(dt, characterList){
    this.fireTimer += dt;
    this.getTarget(characterList);
    for(var i = this.bullets.length - 1; i >= 0; i--){
        this.bullets[i].update(dt);
        if(this.bullets[i].lifeTime > 5)
        this.bullets.splice(i, 1);
    }
    if(this.target != undefined){
        var vector = normal({
            x: this.target.position.x - this.position.x,
            y: this.target.position.y - this.position.y,
        });
        if(this.direction === -1){
            vector.x *= -1;
        }
        this.rotation = lerp(this.rotation, (180 / Math.PI) * Math.atan2(vector.y, vector.x), .2);
        var position = JSON.parse(JSON.stringify(this.position));
        if(this.fireTimer > 1 / this.fireRate){
            this.bullets.push(new bulletObject(
                this.bulletType, 
                this.damage, 
                this.rotation, 
                vector, //normalized velocity vector 
                {
                    x: position.x + vector.x * 55 * this.direction,
                    y: position.y + vector.y * 55
                }, 
                200,    //bullet speed
                .521,     //scale
                this.direction));
            this.fireTimer = 0;
        }

    }else{
        this.rotation = lerp(this.rotation, 0, .05);
    }

    this.target = undefined;
}
turretObject.prototype.getTarget = function(characterList){
    this.targets = [];
    var record = Number.MAX_VALUE;
    for(var i = 0; i < characterList.length; i++){
        var character = characterList[i];
        var distance = magnitude({
            x: this.position.x - character.position.x,
            y: this.position.y - character.position.y
        });
        if(distance <= this.range && distance < record){
            record = distance;
            this.target = character;
        }
    }
}
turretObject.prototype.drawBullets = function(ctx, swap){
    for(var i = 0; i < this.bullets.length; i ++){
        this.bullets[i].draw(ctx, swap);
    }
}