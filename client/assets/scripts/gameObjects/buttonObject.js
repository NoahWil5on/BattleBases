function buttonObject(image, position, scale){
    this.imageNum = image,
    this.image = getButton(this.imageNum);
    this.imageWidth = this.image.width;
    this.imageHeight = this.image.height;
    this.width = this.imageWidth * scale;
    this.height = this.imageHeight * scale;
    this.position = position;
    this.scale = scale || 1;
	this.isClicked = false;
}
buttonObject.prototype = Object.create(gameObject.prototype);
//Takes in a function to call, and its parameters
//This way we can call whatever functions we need for the specific button
buttonObject.prototype.update = function(funcToCall, para){
    funcToCall(para);
}
buttonObject.prototype.hover = function(correctPosition){
    let pos = this.position
    let scale = this.scale || 1;
    if(correctPosition){
        pos = {
            x: (this.position.x - ((this.width / 2))),
            y: (this.position.y - ((this.height / 2)))
        }
    }
    let buttonRect = {
        width: this.width,
        height: this.height,
        pos: pos
    };
    if(pointInRect(app.main.mouse,buttonRect)) 
    {
        app.main.canvas.style.cursor = 'pointer';
        return true;
    }
    return false;
}
buttonObject.prototype.hold = function(correctPosition){
    if(!this.hover(correctPosition)){
        return false;
    }
    if(app.main.mouseDown){
        return true;
    }
    return false;
}
buttonObject.prototype.clicked = function(correctPosition){
    if(!this.hover(correctPosition)){
        return false;
    }
    if(app.main.clicked){
        return true;
    }
    return false;
}