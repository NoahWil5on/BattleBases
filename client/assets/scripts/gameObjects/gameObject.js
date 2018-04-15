//default construtor, doesn't do much, all code in constructor must 
//be copy pasted (omit throw error) to any new objects using the 
//game object class
function gameObject(image, position){
    throw new Error("Can't instantiate abstract class");
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;
};
gameObject.prototype.draw = function(ctx, flip){
    ctx.save();

    //not all objects will have rotation, if not then set rotation to 0
    var rot = this.rotation || 0;        
    var scale = this.scale || 1;   
    var swap = 1;
    if(flip) swap = -1;
    rot = (this.rotation * Math.PI) / 180;  //convert rotation to radians

    ctx.rotate(rot);
    ctx.scale(scale * swap,scale);
    ctx.translate(this.position.x / scale, this.position.y / scale )

    ctx.drawImage(
        this.image,
        -(this.width / 2),
        -(this.height / 2)
    );

    ctx.restore();
}
