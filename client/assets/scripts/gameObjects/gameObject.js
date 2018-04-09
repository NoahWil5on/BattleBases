function gameObject(image, position){
    throw new Error("Can't instantiate abstract class");
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;   
    this.rotation = 0;  
};
gameObject.prototype.draw = function(ctx,rot){
    ctx.save();

    rot = rot || 0;
    rot = (rot * Math.PI) / 180;

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
