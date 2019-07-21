import { Particle } from "./particle";
import { Material } from "./material";
import { psOptions } from "./ps_options";
import { Emitter } from "./emitter/emitter";
import { Field } from "./field/field";
import { Force } from "./force/force";

class ParticleSystem {
    private particles: Particle[];
    private forces: Force[];
    private fields: Field[];
    private material: Material;
    private ps_options: psOptions;
    private emitter: Emitter;

    constructor(ps_options: psOptions, emitter: Emitter, material: Material) {
        this.ps_options = ps_options;
        this.emitter = emitter;
        this.material = material;
        this.particles = new Array();
        this.forces = new Array();
        this.fields = new Array();
    }

    addForce(force: Force) {
        this.forces.push(force);
    }

    addField(field: Field) {
        this.fields.push(field);
    }

    update() {
        this.addNewParticles();
        this.updateParticleSystem();
    }

    draw(ctx: any) {
        for (let i = 0; i < this.particles.length; i++) {
            let p: Particle = this.particles[i];
            ctx.beginPath();
            ctx.fillStyle = this.material.color;
            ctx.arc(p.position.x, p.position.y, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    private updateParticleSystem() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p: Particle = this.particles[i];
            this.applyForces(p);
            this.applyFields(p);
            p.update();
            if (!p.isActive) {
                this.particles.splice(i, 1);
            }
        }
    }

    private addNewParticles() {
        if (this.particles.length < this.ps_options.particles_max) {
            let n: number = Math.floor(
                this.ps_options.particles_per_frame +
                    this.rand() * this.ps_options.particles_per_frame_variance
            );
            for (let i = 0; i < n; i++) {
                let lifetime: number = Math.floor(
                    this.ps_options.particles_lifetime +
                        this.rand() *
                            this.ps_options.particles_lifetime_variance
                );
                let particle = new Particle(lifetime, this.material);
                particle.liveforever = this.ps_options.particles_liveforever;
                particle.position = this.emitter.getRandomPosition();
                this.particles.push(particle);
            }
        }
    }

    private applyForces(p: Particle) {
        for (let i = 0; i < this.forces.length; i++) {
            let f: Force = this.forces[i];
            p.addForce(f.getForce());
        }
    }

    private applyFields(p: Particle) {
        for (let i = 0; i < this.fields.length; i++) {
            let field: Field = this.fields[i];
            field.updateParticle(p);
            if (field.active) {
                p.addForce(field.getForce());
            }
        }
    }

    // returns [-1, 1]
    private rand() {
        return Math.random() * 2 - 1;
    }
}

export { ParticleSystem };
