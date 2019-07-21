import { Vector } from "../utils/vector";
import { Particle } from "../particle";

interface Field {
    active: boolean;
    updateParticle(p: Particle): void;
    getForce(): Vector;
}

export { Field };
