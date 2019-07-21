import { Force } from "./force";
import { Vector } from "../utils/vector";

class Wind implements Force {
    private force: Vector;

    constructor(acc_x: number, acc_y: number, mass: number) {
        this.force = new Vector(acc_x * mass, acc_y * mass);
    }

    getForce(): Vector {
        let gust: Vector = new Vector(
            this.force.x * Math.random(),
            this.force.y * Math.random()
        );
        return gust;
    }
}

export { Wind };
