import { Emitter } from "./emitter";
import { Vector } from "../utils/vector";

class CircleEmitter implements Emitter {
    private x: number;
    private y: number;
    private r: number;
    public fill: boolean;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.fill = true;
    }

    getRandomPosition(): Vector {
        let angle: number = 2 * Math.PI * Math.random();
        let radius: number = this.fill ? this.r * Math.random() : this.r;
        let rx: number = this.x + radius * Math.cos(angle);
        let ry: number = this.y + radius * Math.sin(angle);
        let pos: Vector = new Vector(rx, ry);
        return pos;
    }
}

export { CircleEmitter };
