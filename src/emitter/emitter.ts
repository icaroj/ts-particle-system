import { Vector } from "../utils/vector";

interface Emitter {
    fill: boolean;
    getRandomPosition(): Vector;
}

export { Emitter };
