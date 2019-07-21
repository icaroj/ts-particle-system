import { Field } from "./field";
import { Vector } from "../utils/vector";
import { Particle } from "../particle";

class Attract implements Field {
    public active: boolean;
    private m_particle: Particle;
    private m_target_position: Vector;
    private m_gain: number;

    constructor(gain: number) {
        this.m_particle = null;
        this.m_target_position = new Vector(0, 0);
        this.m_gain = gain;
        this.active = false;
    }

    from(target_position: Vector) {
        this.active = true;
        this.m_target_position = target_position;
    }

    updateParticle(p: Particle) {
        this.m_particle = p;
    }

    getForce(): Vector {
        if (!this.active) {
            return new Vector(0, 0);
        }

        let force: Vector = this.m_particle.position.distanceTo(
            this.m_target_position
        );
        let d: number = force.magnitude();
        d = this.constrain(d, 35, 100);
        force.normalize();
        force.mult(this.m_gain / (d * d));
        return force;
    }

    private constrain(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }
}

export { Attract };
