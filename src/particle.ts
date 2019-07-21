import { Vector } from "./utils/vector";
import { Material } from "./material";

class Particle {
    private material: Material;
    private m_position: Vector;
    private m_velocity: Vector;
    private m_acceleration: Vector;
    private m_liveforever: boolean;
    private m_lifetime: number;
    private m_time_lived: number;
    private m_active: boolean;

    set position(point: Vector) {
        this.m_position.x = point.x;
        this.m_position.y = point.y;
    }

    get position(): Vector {
        return this.m_position;
    }

    set velocity(v: Vector) {
        this.m_velocity.x = v.x;
        this.m_velocity.y = v.y;
    }

    get velocity(): Vector {
        return this.m_velocity;
    }

    set liveforever(b: boolean) {
        this.m_liveforever = b;
    }

    get isActive(): boolean {
        return this.m_active;
    }

    addForce(force: Vector) {
        force.mult(1 / this.material.mass);
        this.m_acceleration.add(force);
    }

    constructor(m_lifetime: number, material: Material) {
        this.material = material;
        this.m_position = new Vector(0, 0);
        this.m_velocity = new Vector(0, 0);
        this.m_acceleration = new Vector(0, 0);
        this.liveforever = false;
        this.m_lifetime = m_lifetime;
        this.m_time_lived = 0;
        this.m_active = true;
    }

    update() {
        this.m_velocity.add(this.m_acceleration);
        this.m_position.add(this.m_velocity);
        this.m_acceleration.zero();

        if (this.m_time_lived > this.m_lifetime) {
            this.m_active = false;
        }

        if (!this.m_liveforever) {
            this.m_time_lived++;
        }
    }
}

export { Particle };
