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
gameObject.prototype.draw = function(ctx){
    ctx.save();

    //not all objects will have rotation, if not then set rotation to 0
    var rot = this.rotation || 0;           
    rot = (this.rotation * Math.PI) / 180;  //convert rotation to radians

    ctx.rotate(rot);
    ctx.translate(this.position.x, this.position.y )

    //the division by 10 and multiplication by 10 are just because the image is so big
    //on the screen (its just scaling the image) will be removed later to commented version
    ctx.drawImage(
        this.image,
        -(this.width / 10),
        -(this.height / 10),
        this.width / 5,
        this.height / 5
    );
    // ctx.drawImage(
    //     this.image,
    //     -(this.width / 2),
    //     -(this.height / 2)
    // );

    ctx.restore();
}
