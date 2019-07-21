import { Force } from "./force";
import { Vector } from "../utils/vector";

class Gravity implements Force {
    private force: Vector;

    constructor(acc_x: number, acc_y: number, mass: number) {
        this.force = new Vector(acc_x * mass, acc_y * mass);
    }

    getForce(): Vector {
        return this.force;
    }
}

export { Gravity };
