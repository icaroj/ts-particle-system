import { Field } from "./field";
import { Vector } from "../utils/vector";
import { Particle } from "../particle";

class Repel implements Field {
    public active: boolean;
    private m_particle: Particle;
    private m_target_position: Vector;
    private gain: number;

    constructor(gain: number) {
        this.m_particle = null;
        this.m_target_position = new Vector(0, 0);
        this.gain = gain;
        this.active = false;
    }

    from(m_target_position: Vector) {
        this.active = true;
        this.m_target_position = m_target_position;
    }

    updateParticle(p: Particle) {
        this.m_particle = p;
    }

    getForce(): Vector {
        if (!this.active) {
            return new Vector(0, 0);
        }
        let distance: Vector = this.m_particle.position.distanceTo(
            this.m_target_position
        );
        let f: Vector = new Vector(distance.x, distance.y);
        let d: number = distance.magnitude();
        f.normalize();
        if (d < 5) d = 5;
        f.mult(-this.gain / (d * d));
        return f;
    }
}

export { Repel };
