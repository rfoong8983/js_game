import MovingObject from '../entities/moving_object';
import { merge } from 'lodash';

function Game() {
    this.players = [];
    this.movingObjects = [];

    Game.X = 1200;
    Game.Y = 800;
    Game.FPS = 32;

    Game.prototype.allEntities = function () {
        return _.merge(this.players, this.movingObjects);
    };


    Game.prototype.add = function (object) {
        if (object.constructor.name === 'MovingObject') {
            this.movingObjects.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    };

    Game.prototype.addMovingObject = function () {
        const movingObject = new MovingObject({
            pos: [5, 790], // add radius later to acct for object height
            game: this,
            velocity: [0, 0],
            color: 'white',
            radius: 10
        });

        this.add(movingObject);
        return movingObject;
    };

    Game.prototype.draw = function draw(ctx) {
        ctx.clearRect(0, 0, Game.X, Game.Y);
        
        this.allEntities().forEach(function(object) {
            object.draw(ctx);
        });
    };
    
}

module.exports = Game;