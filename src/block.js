export default class {
    constructor(arg) {
        const {width, height, origin} = arg;
        this.width = width;
        this.height = height;
        this.origin = origin;

        this.isCollision = false;
    }

    render(ctx) {
        ctx.save();

        ctx.fillStyle = '#0f0';
        console.log(this.isCollision);
        if (this.isCollision)
            ctx.fillStyle = '#f00';

        ctx.fillRect(
            this.origin.x,
            this.origin.y,
            this.width,
            this.height);

        ctx.strokeRect(
            this.origin.x,
            this.origin.y,
            this.width,
            this.height);

        ctx.restore();
    }
}