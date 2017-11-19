import {Game} from '#/Game.js'

export let xp_levels = [50];
for (let i = 1; i < 100; i++)
    xp_levels.push(1.5 * xp_levels[i - 1]);

export const EntityTypes = {
    PLAYER : 0,
    GOBLIN : 1,
    RAT : 2,
    LADDER_DOWN : 3,
    LADDER_UP : 4,
    SWORD : 5,
    NPC : 6,
    ORC : 7,
    EMPOWERED_ORC : 8,
    DOOR : 9,
    CHEST : 10,
    HEALTH_POTION : 11,
    STRENGTH_POTION : 12
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is exclusive and the minimum is inclusive
}

/* Entities are in-game objects that exist in the map. They have symbols,
 * foregrounds, backgrounds, descriptions, names, visibility, and blocked properties. */
export class Entity {
    constructor(x, y, options) {
        this.x = x;
        this.y = y;
        this.options = options;
        if (options.id === undefined) throw "Error - entity created without valid id";
        this.id = this.options.id;
    }

    description() {
        return this.options.description;
    }

    name() {
        return this.options.name;
    }

    clipLocation() {
        let c = getTilesetCoords(this.options.id);
        let css = `${c[1]} ${c[0] + 32} ${c[1] + 32} ${c[0] + 32} ${c[0]}`;
        console.log(c);
        console.log(css);
        return css;
    }

    move(nx, ny) {
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        let ctile = Game.map.data[this.y][this.x]; // current tile
        ctile.removeActor(this); // remove this actor from this tile
        ntile.actors.push(this); // add this actor to the new tile
        this.x = nx; // update x,y coords to new coords
        this.y = ny;
        // Game.drawActor(this); // draw the actor at the new spot
        // Game.drawViewPort();
        // Game.drawMiniMap();
    }

    placeAt(nx,ny) {
        let ntile = Game.map.data[ny][nx]; // new tile to move to
        ntile.actors.push(this); // add this actor to the new tile
        this.x = nx; // update x,y coords to new coords
        this.y = ny;
    }

}

/* Ranged attack? */
// for (let dir of ROT.DIRS) {
//     for (let i = 0; i < range_of_mob; i++) {
//     let tile = Game.map[mob.x + dir.x*i][mob.y + dir.y*i];
//         if  (tile.contains(player))
//             mob.attack(player);
//         else if (tile.blocked)
//             continue;
//     }
// }
// ranged_attack: function() {
//     let p = Game.player;
//     let combine = function(arr, di) {
//       return [arr[0]*di + p.x, arr[1]*di + p.y];
//     }
//
//     for (let i = 0; i < 10; i++) {
//       for (let dir of ROT.DIRS[8]) {
//         let delta = combine(dir, i); // [x,y]
//         if (delta[0] < 0 || delta[0] === Game.map.width || delta[1] < 0 || delta[1] === Game.map.height)
//           continue;
//         else
//           this.drawFirstActor(Game.map.data[delta[1]][delta[0]]);
//       }
//     }
// },
