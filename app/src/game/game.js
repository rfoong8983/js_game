import MovingObject from '../entities/moving_object';
import { merge } from 'lodash';

const X = 1200;
const Y = 800;
const FPS = 32;

class Game {
    constructor() {
        this.players = [];
        this.movingObjects = [];
    }

    allEntities () {
        return _.merge(this.players, this.movingObjects);
    }

    add (object) {
        if (object.constructor.name === 'MovingObject') {
            this.movingObjects.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    }

    addMovingObject () {
        const movingObject = new MovingObject({
            pos: [10, 790], // add radius later to acct for object height
            game: this,
            velocity: [0, 0],
            color: 'white',
            radius: 10
        });

        this.add(movingObject);
        return movingObject;
    }

    moveObjects (delta) {
        this.allEntities().forEach((object) => {
            object.move(delta);
        });
    }

    step (delta) {
        this.moveObjects(delta);
    }

    draw(ctx) {
        ctx.clearRect(0, 0, X, Y);
        
        this.allEntities().forEach((object) => {
            object.draw(ctx);
        });
    }
    
}

export default Game;