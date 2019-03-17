import MovingObject from '../entities/moving_object';
import { merge } from 'lodash';

const X = 1200;
const Y = 800;
const FPS = 32;

class Game {
    constructor() {
        this.stars = [];
        this.movingObjects = [];
    }

    allEntities () {
        const merged = _.merge(this.stars, this.movingObjects);
        return merged;
    }

    add (object) {
        if (object.constructor.name === 'MovingObject') {
            this.movingObjects.push(object);
        } else if (object.constructor.name === 'Star') {
            this.stars.push(object);
        } else {
            throw new Error("unknown type of object");
        }
            
    }

    checkCollisions() {
        const all = this.allEntities();
        for (let i = 0; i < all.length; i++) {
            for (let j = 0; j < all.length; j++) {
                const obj1 = all[i];
                const obj2 = all[j];

                if (i === j) {
                    continue;
                }
                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.isCollidedWith(obj2);
                    if (collision) {
                        console.log(collision);
                        return;
                    }
                }
            }
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

    addStar(star) {
        // console.log(this.movingObjects);
        // console.log(this.stars);
        // console.log(this.allEntities());
        this.add(star);
        return star;
    }

    moveObjects (delta) {
        this.allEntities().forEach((object) => {
            if (object.constructor.name !== 'Star') {
                object.move(delta);
            }
        });
    }

    step (delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }

    draw(ctx) {
        ctx.clearRect(0, 0, X, Y);
        
        this.allEntities().forEach((object) => {
            object.draw(ctx);
        });
    }
    
}

export default Game;