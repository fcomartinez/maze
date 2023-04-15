class Player {
    constructor() {
        
    }

    nickname = '';
    initX= 40;
    initY= 40;
    x1= 40;
    y1= 40;
    x2= null;
    y2= null;
    width= 10;
    height= 10;
    color= 'red';
    velocity= 8;
    started= false;
    secondsAlive= 0;
    updateDimensions = function() {
        this.x2 = this.x1 + this.width;
        this.y2 = this.y1 + this.height;
    }
    reset = function() {
        this.x1 = this.initX;
        this.y1 = this.initY;
        this.updateDimensions();
        this.started = false;
        this.secondsAlive = 0;
    }
}

export default Player;