import MovingObject from '../entities/moving_object';
import utils from '../utils/utils';
import { merge } from 'lodash';

const X = 1200;
const Y = 793;
const FPS = 32;

class Game {
    constructor() {
        this.stars = [];
        this.movingObjects = [];
        this.gameOver = false;
    }

    allEntities () {
        return [].concat(this.stars, this.movingObjects);
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
                // console.log(utils.distance(obj1.pos[0], obj1.pos[1], obj2.pos[0], obj2.pos[1]));
                // console.log(obj1,obj2)
                // if (i === j) {
                //     continue;
                // }
                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.isCollidedWith(obj2);
                    if (collision) {
                        if (i !== j && all[i].constructor.name !== all[j].constructor.name) {
                            // console.log(obj1) => star
                            obj1.handleCollision();
                            this.gameOver = true;
                            // obj2.handleCollision();
                        }
                        return;
                    }
                }
            }
        }
    }


    addMovingObject () {
        const movingObject = new MovingObject({
            pos: [10, 560], // add radius later to acct for object height
            game: this,
            velocity: [0, 0],
            color: 'white',
            radius: 2
        });

        this.add(movingObject);
        return movingObject;
    }

    addStar(star) {
        // console.log(this.movingObjects);
        // console.log(this.stars);
        // console.log(this.allEntities());
        this.add(star);
        // console.log(this.stars);
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