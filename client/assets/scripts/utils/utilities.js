"use strict";

//gets a random int between 0 and num
function getRandomInt(num){
    return Math.floor(Math.random() * num);
}

//check collision between rect & circle
function RectCircleCollision(box,ball){

    //vector from rect to circle
    var point = {
        x: (ball.pos.x - box.pos.x),
        y: (ball.pos.y - box.pos.y)
    }

    //where that point lies on the outer edge of the box
    //(finds the closest point on the box to the circle)
    point.x = Math.max(-box.width / 2, Math.min(box.width / 2, point.x));
    point.y = Math.max(-box.height / 2, Math.min(box.height / 2, point.y));

    //vector of that point to the circle
    point.x += box.pos.x;
    point.y += box.pos.y;

    var mag = magnitude({
        x: point.x - ball.pos.x,
        y: point.y - ball.pos.y
    });
    

    //is the point less than the radius?

    if(mag < ball.rad){
        return true;
    }

    return false;
}
//checks if two circles are colliding
function CircleCircleCollision(ball1, ball2){
    var difference = magnitude({
        x: (ball1.x - ball2.x),
        y: (ball1.y - ball2.y)
    });

    if(difference < (ball1.rad + ball2.rad)) return true;
    return false;
}
//checks if two boxes are colliding
function RectRectCollision(box1, box2){
    if(box1.pos.x < box2.pos.x + box2.width && 
        box2.pos.x < box1.pos.x + box1.pos.width){
            if(box1.pos.y < box2.pos.y + box2.height && 
                box2.pos.y < box1.pos.y + box1.pos.height){
        
            }
    }
    return false;
}
//returns mouse position ov given element
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}
//check if a given point is in a given rectangle
function pointInRect(point, rect){
    if(point.x > rect.x && point.x < rect.x + rect.width){
        if(point.y > rect.y && point.y < rect.y + rect.height) return true;
    }
    return false;
}
//interpolate between two numbers
function lerp(s,e,a){
    return s + ((e - s) * a)
}

//singleton for checking key presses
var Key = {
    //list of pressed keys
    pressed: {},

    //some default keys
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,

    //checks whether that "keyCode" is pressed
    isDown: function (keyCode) {
        return this.pressed[keyCode];
    },
    //add key to "pressed"
    onKeydown: function (event) {
        this.pressed[event.keyCode] = true;
    },
    //remove key from "pressed"
    onKeyup: function (event) {
        delete this.pressed[event.keyCode];
    }
};

//keyboard event listeners
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);