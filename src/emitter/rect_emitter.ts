import { Emitter } from "./emitter";
import { Vector } from "../utils/vector";

class RectEmitter implements Emitter {
    private x: number;
    private y: number;
    private width: number;
    private height: number;
    public fill: boolean;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x - width / 2;
        this.y = y - height / 2;
        this.width = width;
        this.height = height;
        this.fill = true;
    }

    getRandomPosition(): Vector {
        let w: number;
        let h: number;

        if (this.fill) {
            w = Math.random() * this.width;
            h = Math.random() * this.height;
        } else {
            if (Math.random() < 0.5) {
                w = Math.random() * this.width;
                h = this.flipCoin() * this.height;
            } else {
                w = this.flipCoin() * this.width;
                h = Math.random() * this.height;
            }
        }

        let rx: number = this.x + w;
        let ry: number = this.y + h;
        let pos: Vector = new Vector(rx, ry);

        return pos;
    }

    // return 0 | 1
    private flipCoin(): number {
        return Math.random() < 0.5 ? 0 : 1;
    }
}

export { RectEmitter };
