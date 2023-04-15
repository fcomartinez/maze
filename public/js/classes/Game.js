import { ctx } from "../selectors.js";
import Player from "../classes/Player.js";
import Walls from "../classes/Walls.js";
import Screen from "./Screen.js";
import DB from "./DB.js";
import UI from "./UI.js";

const player = new Player();
const walls = new Walls();
const screen = new Screen();
const db = new DB();
const ui = new UI();

let frame;

class Game {
    constructor(nickname) {
        
        player.nickname = nickname;
    }

    world = {
        start: () => {
            frame = window.requestAnimationFrame(this.world.start);
            this.canvas();
            this.events();
            this.collisions();
            this.time();
            this.win();
        }
    }

    canvas = function() {
        this.drawPlayer();
        this.drawWalls();
    }

    drawPlayer = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x1, player.y1, player.width, player.height);
    }

    drawWalls = function() {
        walls.array.forEach( wall => {
            ctx.fillStyle = wall.color;
            ctx.fillRect(wall.x1, wall.y1, wall.width, wall.height);
            wall.x2 = wall.x1 + wall.width;
            wall.y2 = wall.y1 + wall.height;
        });
    }

    events =  function() {
        document.addEventListener("keydown", this.movePlayer);
    }

    movePlayer = function(key) {
        switch(key.keyCode) {
            case 37: //Left 
                key.preventDefault();
                player.x1 = player.x1 - player.velocity;
                player.updateDimensions();
                player.started = true;
                break;
            case 38: //Up
                key.preventDefault();
                player.y1 = player.y1 - player.velocity;
                player.updateDimensions(); 
                player.started = true;
                break;
            case 39: //Right
                key.preventDefault();
                player.x1 = player.x1 + player.velocity;
                player.updateDimensions();
                player.started = true;
                break;
            case 40: //Down
                key.preventDefault();
                player.y1 = player.y1 + player.velocity;
                player.updateDimensions();
                player.started = true;
                break;
        }
    }

    collisions = function() {
        if(player.x1 < screen.x1) { //Left screen
            player.x1 = screen.x1;
            player.updateDimensions();
        }

        if(player.x2 > screen.x2) { //Right screen
            player.x1 = screen.x2 - player.width;
            player.updateDimensions();
        }

        if(player.y1 < screen.y1) { //Up screen
            player.y1 = screen.y1;
            player.updateDimensions();
        }

        if(player.y2 > screen.y2) { //Down screen
            player.y1 = screen.y2 - player.height;
            player.updateDimensions();
        }

        walls.array.forEach( wall => {
            if(player.x2 > wall.x1 && player.y1 < wall.y2 && player.y2 > wall.y1 && player.x1 < wall.x2 ) {
                ui.showFeedback(`You losed in ${player.secondsAlive} seconds`);
                player.reset();
            }
        });
    }

    win = async function() {
        const lastWall = walls.array.slice(-1);
        if( player.x1 > lastWall[0].x2 ) {

            player.started = false;
            ui.showFeedback(`You won in ${player.secondsAlive} seconds`);
            ui.toogleGameContainer();
            ui.toogleWinnerContainer();
            cancelAnimationFrame(frame);

            const score = {nickname: player.nickname, seconds: player.secondsAlive, id: Date.now()};

            try {
                console.log(await db.saveScore(score));
                const scoresItems = await db.getScores();
                ui.showScores(scoresItems);
            } catch (error) {
                console.log(error);
            }

        }
    }

    fps = 0;

    time = function() {
        if( player.started ) {
            if( this.fps >= 60 ) {
                this.fps = 0;
                player.secondsAlive++;
                ui.showFeedback(`${player.secondsAlive} seconds`);
            } else {
                this.fps++;
            }
        }
    }
}

export default Game;