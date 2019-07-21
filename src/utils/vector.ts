class Vector {

    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(other: Vector) {
        this.x += other.x;
        this.y += other.y;
    }

    mult(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        let d: number = this.magnitude();
        this.x /= d;
        this.y /= d;
    }

    zero() {
        this.x = 0;
        this.y = 0;
    }

    distanceTo(other: Vector): Vector {
        return new Vector(other.x - this.x, other.y - this.y);
    }

    within(point: Vector, radius: number): boolean {
        return (
            this.x <= point.x + radius &&
            this.x >= point.x - radius &&
            this.y <= point.y + radius &&
            this.y >= point.y - radius
        );
    }

}

export { Vector };