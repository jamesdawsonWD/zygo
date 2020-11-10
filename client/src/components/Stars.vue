<script>
// Note how there's no template or styles in this component.

// Helper functions to convert a percentage of canvas area to pixels.
const percentWidthToPix = (percent, ctx) => Math.floor((ctx.canvas.width / 100) * percent);
const percentHeightToPix = (percent, ctx) => Math.floor((ctx.canvas.height / 100) * percent);

window.requestAnimationFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();
import { Vector, Star, randomColorFromArray, randomIntFromRange } from '@/utils';
export default {
    // Gets us the provider property from the parent <my-canvas> component.
    inject: ['provider'],
    props: {
        // Start coordinates (percentage of canvas dimensions).
        x1: {
            type: Number,
            default: 0
        },
        y1: {
            type: Number,
            default: 0
        },

        // End coordinates (percentage of canvas dimensions).
        x2: {
            type: Number,
            default: 0
        },
        y2: {
            type: Number,
            default: 0
        },

        // The value to display.
        value: {
            defualt: 0
        },

        // The color of the box.
        background: {
            type: String,
            default: '#F00'
        }
    },

    data() {
        return {
            // We cache the dimensions of the previous
            // render so that we can clear the area later.
            oldBox: {
                x: null,
                y: null,
                w: null,
                h: null
            },
            config: {
                lastStep: 0,
                totalParticles: 1000,
                colors: ['#560CC5', '#320FA4', '#02094D', '#6D2094']
            },
            spacePressed: false,
            particles: []
        };
    },

    computed: {
        calculatedBox() {
            const ctx = this.provider.context;

            // Turn start / end percentages into x, y, width, height in pixels.
            const calculated = {
                x: percentWidthToPix(this.x1, ctx),
                y: percentHeightToPix(this.y1, ctx),
                w: percentWidthToPix(this.x2 - this.x1, ctx),
                h: percentHeightToPix(this.y2 - this.y1, ctx)
            };

            // Yes yes, side-effects. This lets us cache the box dimensions of the previous render.
            // before we re-calculate calculatedBox the next render.
            return calculated;
        }
    },
    methods: {
        clearCanvas() {
            const ctx = this.provider.context;
            ctx.globalCompositeOperation = 'source-over';
            ctx.fillStyle = this.background;
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fill();
        },
        animate(milliseconds) {
            const ctx = this.provider.context;
            this.clearCanvas();
            const elapsed = milliseconds - this.config.lastStep;
            this.config.lastStep = milliseconds;
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].update(elapsed, ctx);
            }
            requestAnimationFrame(this.animate);
        },
        mouseMoved(event) {
            if (!this.spacePressed) return;
            const ctx = this.provider.context;
            const mousePos = new Vector(event.x, event.y);

            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].dest = mousePos;
            }
        },
        checkSpaceDown(event) {
            if (event.keyCode == 32) {
                this.spacePressed = true;
            }
        },
        revertSpacePress(event) {
            if (event.keyCode == 32) {
                this.spacePressed = false;
            }
        },
        resize() {
            const ctx = this.provider.context;

            ctx.canvas.width = innerWidth;
            ctx.canvas.height = innerHeight;

            this.init();
        },
        init() {
            const ctx = this.provider.context;
            this.particles = [];
            for (let i = 0; i < this.config.totalParticles; i++) {
                let vector;
                if (i < 250) {
                    const origin = new Vector(randomIntFromRange(-1000, ctx.canvas.width + 1000), -500);
                    const dest = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2);

                    vector = new Star(
                        origin,
                        dest,
                        randomIntFromRange(1, 20),
                        randomColorFromArray(this.config.colors),
                        randomIntFromRange(50, 500)
                    );
                } else if (i >= 250 && i < 500) {
                    const origin = new Vector(
                        ctx.canvas.width + 500,
                        randomIntFromRange(-1000, ctx.canvas.height + 1000)
                    );
                    const dest = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2);
                    vector = new Star(
                        origin,
                        dest,
                        randomIntFromRange(1, 20),
                        randomColorFromArray(this.config.colors),
                        randomIntFromRange(50, 500)
                    );
                } else if (i >= 500 && i < 750) {
                    const origin = new Vector(
                        randomIntFromRange(-1000, ctx.canvas.width + 1000),
                        ctx.canvas.height + 500
                    );
                    const dest = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2);

                    vector = new Star(
                        origin,
                        dest,
                        randomIntFromRange(1, 20),
                        randomColorFromArray(this.config.colors),
                        randomIntFromRange(50, 500)
                    );
                } else {
                    const origin = new Vector(-500, randomIntFromRange(-1000, ctx.canvas.height + 1000));
                    const dest = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2);

                    vector = new Star(
                        origin,
                        dest,
                        randomIntFromRange(1, 20),
                        randomColorFromArray(this.config.colors),
                        randomIntFromRange(50, 500)
                    );
                }
                this.particles.push(vector);
            }
            this.animate(0);
        }
    },

    render() {
        // Since the parent canvas has to mount first, it's *possible* that the context may not be
        // injected by the time this render function runs the first time.
        if (!this.provider.context) return;
        const ctx = this.provider.context;

        // Keep a reference to the box used in the previous render call.
        const oldBox = this.oldBox;
        // Calculate the new box. (Computed properties update on-demand.)
        const newBox = this.calculatedBox;

        this.oldBox = newBox;

        return null;
    },
    mounted() {
        window.addEventListener('mousemove', this.mouseMoved);
        window.addEventListener('keydown', this.checkSpaceDown);
        window.addEventListener('keyup', this.revertSpacePress);
        window.addEventListener('resize', this.resize);
    },
    updated() {
        if (!this.provider.context) return;
        this.init();
    }
};
</script>
