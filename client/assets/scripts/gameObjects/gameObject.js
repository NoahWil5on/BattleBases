//default construtor, doesn't do much, all code in constructor must 
//be copy pasted (omit throw error) to any new objects using the 
//game object class
function gameObject(image, position){
    throw new Error("Can't instantiate abstract class");
    this.imageNum = image;
    this.image = getGeneralObject(this.imageNum);
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    this.width = this.imageWidth * scale;
    this.height = this.imageHeight * scale;
    this.position = position;
    this.id = `${Date.now()}`;
};
gameObject.prototype.draw = function(ctx, flip, override){
    var image = this.image
    if(override){
        image = document.getElementById(override);
    }
    ctx.save();

    //not all objects will have rotation, if not then set rotation to 0
    var rot = this.rotation || 0;        
    var scale = this.scale || 1;   
    var swap = 1;
    if(flip) swap = -1;
    rot = (this.rotation * Math.PI) / 180;  //convert rotation to radians

    
    ctx.scale(scale * swap, scale);
    //flip them back lol
    ctx.translate(this.position.x / (scale * swap), this.position.y / (scale));
    ctx.rotate(rot);

    ctx.drawImage(
        image,
        -(this.imageWidth / 2),
        -(this.imageHeight / 2)
    );

    ctx.restore();
}
