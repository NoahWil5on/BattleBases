//character constructor
//image and speed are required
function buttonObject(image, position){
    if(arguments.length < 2) 
        throw new Error("Image and Position are necessary to make character");
    this.image = image;
    this.width = image.width;
    this.height = image.height;
    this.position = position;
	this.isClicked = false;
}
buttonObject.prototype = Object.create(gameObject.prototype);
//Takes in a function to call, and its parameters
//This way we can call whatever functions we need for the specific button
buttonObject.prototype.update = function(funcToCall, para){
    funcToCall(para);
}
//pass in mouse coordinates
buttonObject.prototype.clicked = function(coords){
	//Do simple check if the click is on our button
    if (coords.x > this.position.x &&
		coords.x < this.position.x + this.width/2 &&
		coords.y > this.position.y &&
		coords.y < this.position.y + this.height/2) {
		//in our button, so set isClicked to true
		this.isClicked = true;		
	} else {
		this.isClicked = false;
	}
}