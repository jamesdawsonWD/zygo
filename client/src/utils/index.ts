export class HSLA {
    public h: string | number;
    public s: string | number;
    public l: string | number;
    public a: string | number;

    constructor(h: string | number, s: string | number, l: string | number, a: string | number) {
        this.h = h || 0;
        this.s = s || 0;
        this.l = l || 0;
        this.a = a || 0;
    }

    public toString() {
        return 'hsla(' + this.h + ',' + this.s + '%,' + this.l + '%,' + this.a + ')';
    }
}

export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x || 0;
        this.y = y || 0;
    }

    public set(x: number | Vector, y: number) {
        if (typeof x === 'object') {
            y = x.y;
            x = x.x;
        }
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }

    public sub(v: Vector) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public scale(s: number) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    public length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public lengthSq() {
        return this.x * this.x + this.y * this.y;
    }

    public normalize() {
        const m = Math.sqrt(this.x * this.x + this.y * this.y);
        if (m) {
            this.x /= m;
            this.y /= m;
        }
        return this;
    }

    public angle() {
        return Math.atan2(this.y, this.x);
    }

    public angleTo(v: Vector) {
        const dx = v.x - this.x,
            dy = v.y - this.y;
        return Math.atan2(dy, dx);
    }

    public distanceTo(v: Vector) {
        const dx = v.x - this.x,
            dy = v.y - this.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public distanceToSq(v: Vector) {
        const dx = v.x - this.x,
            dy = v.y - this.y;
        return dx * dx + dy * dy;
    }

    public lerp(v: Vector, t: number) {
        this.x += (v.x - this.x) * t;
        this.y += (v.y - this.y) * t;
        return this;
    }

    public clone() {
        return new Vector(this.x, this.y);
    }

    public toString() {
        return '(x:' + this.x + ', y:' + this.y + ')';
    }
}

export const vectorAdd = (a: Vector, b: Vector) => {
    return new Vector(a.x + b.x, a.y + b.y);
};

export const vectorSub = (a: Vector, b: Vector) => {
    return new Vector(a.x - b.x, a.y - b.y);
};

export const vectorScale = (v: Vector, s: number) => {
    return v.clone().scale(s);
};

export const vectorRandom = () => {
    return new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
};

export const toVector = (magnitude: number, angle: number): { magnitudeX: number; magnitudeY: number } => {
    return {
        magnitudeX: magnitude * Math.cos(angle),
        magnitudeY: magnitude * Math.sin(angle)
    };
};

export const distanceToAndAngle = (a: Vector, b: Vector) => {
    return {
        distance: a.distanceTo(b),
        angle: a.angleTo(b)
    };
};

export class Star {
    public origin: Vector;
    public birth: Vector;
    public dest: Vector;
    public radius: number;
    public color: string;
    public velocity: number;
    constructor(origin: Vector, dest: Vector, radius: number, color: string, velocity: number) {
        this.origin = origin;
        this.birth = new Vector(Object.assign({}, origin).x, Object.assign({}, origin).y);
        this.dest = dest;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    public draw(milliseconds: number, ctx: any) {
        const data = distanceToAndAngle(this.origin, this.dest);
        const toNewVector = toVector(this.velocity, data.angle);
        const elapsedSeconds = milliseconds / 1000;

        this.origin.x += toNewVector.magnitudeX * elapsedSeconds;
        this.origin.y += toNewVector.magnitudeY * elapsedSeconds;

        const distanceFromBirthToDest = this.birth.distanceTo(this.dest);
        if (data.distance < 15) {
            this.reset();
        }
        const percentageDecrease = data.distance / distanceFromBirthToDest;

        ctx.save();
        ctx.beginPath();
        ctx.translate(this.origin.x, this.origin.y);
        ctx.arc(0, 0, this.radius * percentageDecrease, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    public update(elapsed: number, ctx: any) {
        this.draw(elapsed, ctx);
    }
    public reset() {
        this.origin = new Vector(Object.assign({}, this.birth).x, Object.assign({}, this.birth).y);
    }
}

export const randomIntFromRange = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Returns a color from an array of colours
 * @param {*} colors array of Colours
 */
export const randomColorFromArray = (colors: string[]) => {
    return colors[Math.floor(Math.random() * colors.length)];
};

// /**
//  * Returns a random HSLA colour from the range parameters below
//  * @param {*} hueRange [lowRange, highRange]
//  * @param {*} satRange [lowRange, highRange]
//  * @param {*} lightRange [lowRange, highRange]
//  * @param {*} alphaRange [lowRange, highRange]
//  */
// export const randomColorFromRanges(hueRange, satRange, lightRange, alphaRange) => {
//     return new HSLA(
//         randomIntFromRange(hueRange[0], hueRange[1]),
//         randomIntFromRange(satRange[0], satRange[1]),
//         randomIntFromRange(lightRange[0], lightRange[1]),
//         alphaRange
//     );
// }
