import { Material } from "./src/material";
import { psOptions } from "./src/ps_options";
import { Emitter } from "./src/emitter/emitter";
import { RectEmitter } from "./src/emitter/rect_emitter";
import { CircleEmitter } from "./src/emitter/circle_emitter";
import { ParticleSystem } from "./src/particle_system";
import { Gravity } from "./src/force/gravity";
import { Vector } from "./src/utils/vector";
import { Repel } from "./src/field/repel";
import { Attract } from "./src/field/attract";

let water_ps: ParticleSystem;
let debris_ps: ParticleSystem;

let canvas: any;
let ctx: any;
let frame_counter: number = 0;

function animate() {
    water_ps.update();
    debris_ps.update();

    ctx.clearRect(0, 0, 500, 250);
    water_ps.draw(ctx);
    debris_ps.draw(ctx);

    frame_counter++;
    if (frame_counter % 200 == 0) {
        console.log("frame:", frame_counter);
    }
}

let attract_debris: Attract = new Attract(500);
let repel_water: Repel = new Repel(25);

function onMouseMove(event: any) {
    let x_mouse: number = event.clientX - canvas.offsetLeft;
    let y_mouse: number = event.clientY - canvas.offsetTop;
    let mouse_vec: Vector = new Vector(x_mouse, y_mouse);
    repel_water.from(mouse_vec);
    attract_debris.from(mouse_vec);
}

function init_water() {
    let water_emitter: Emitter = new RectEmitter(250, 125, 15, 10);

    let water_mat: Material = {
        mass: 1,
        color: "hsla(200, 75%, 50%, 0.8)",
        shape: "pixel"
    };

    let water_opts: psOptions = {
        particles_max: 600,
        particles_per_frame: 12,
        particles_per_frame_variance: 0,
        particles_liveforever: false,
        particles_lifetime: 50,
        particles_lifetime_variance: 5
    };

    let gravity: Gravity = new Gravity(0, 0.2, water_mat.mass);

    water_ps = new ParticleSystem(water_opts, water_emitter, water_mat);
    water_ps.addForce(gravity);
    water_ps.addField(repel_water);
}
function init_debris() {
    let debris_emitter: Emitter = new CircleEmitter(100, 120, 10);

    let debris_mat: Material = {
        mass: 1,
        color: "rgb(0, 0, 0)",
        shape: "pixel"
    };

    let debris_opts: psOptions = {
        particles_max: 250,
        particles_per_frame: 5,
        particles_per_frame_variance: 0,
        particles_liveforever: false,
        particles_lifetime: 50,
        particles_lifetime_variance: 0
    };

    debris_ps = new ParticleSystem(debris_opts, debris_emitter, debris_mat);

    let gravity: Gravity = new Gravity(0, 0.1, debris_mat.mass);

    debris_ps.addForce(gravity);
    debris_ps.addField(attract_debris);
}

window.addEventListener("DOMContentLoaded", event => {
    init_water();
    init_debris();

    canvas = document.querySelector("#stage");
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", onMouseMove);

    setInterval(animate, 1000 / 45);
});
