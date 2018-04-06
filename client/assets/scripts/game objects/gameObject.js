function gameObject(){
    this.asset = undefined;
    this.width = undefined;
    this.height = undefined;
    this.position = {
        x: 0,
        y: 0
    };        

    this.draw = function(ctx){
        ctx.drawImage(
            this.asset,
            this.position.x - (this.width / 2),
            this.position.y - (this.height / 2)
        );
    }
};