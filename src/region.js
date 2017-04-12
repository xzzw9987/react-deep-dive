const MAX_LEVELS = 10,
    MAX_BLOCKS = 3;

export default class Region {

    constructor(arg) {
        const {width, height, origin, level = 0} = arg;
        this.width = width;
        this.height = height;
        this.origin = origin;

        this.children = [];
        this.blocks = [];

        this.level = level;
    }

    render(ctx) {
        ctx.save();

        ctx.strokeRect(
            this.origin.x,
            this.origin.y,
            this.width,
            this.height);

        ctx.restore();

        /* check if collide */

        this.blocks.forEach(block=>block.isCollision = false);

        for (let i = 0; i < this.blocks.length; i++)
            for (let j = i + 1; j < this.blocks.length; j++) {

                const ra = this.blocks[i],
                    rb = this.blocks[j];

                if (ra === rb) return;

                if (
                    /* Intersects */
                Math.abs(ra.origin.x - rb.origin.x) < .5 * (ra.width + rb.width)
                && Math.abs(ra.origin.y - rb.origin.y) < .5 * (ra.height + rb.height)) {
                    ra.isCollision = true;
                    rb.isCollision = true;
                }
            }

        this.blocks.forEach(block=>block.render(ctx));

        this.children.forEach(c=>c.render(ctx));
    }

    split() {
        console.log('split');
        this.children = [
            /* top left */
            {
                origin: {x: this.origin.x, y: this.origin.y},
                width: .5 * this.width,
                height: .5 * this.height
            },
            /* top right */
            {
                origin: {x: .5 * this.width + this.origin.x, y: this.origin.y},
                width: .5 * this.width,
                height: .5 * this.height
            },
            /* bottom left */
            {
                origin: {x: this.origin.x, y: .5 * this.height + this.origin.y},
                width: .5 * this.width,
                height: .5 * this.height
            },
            /* bottom right */
            {
                origin: {x: .5 * this.width + this.origin.x, y: .5 * this.height + this.origin.y},
                width: .5 * this.width,
                height: .5 * this.height
            }

        ].map((rect, idx)=> {
            return new Region({...rect, level: 1 + this.level});
        });

    }

    insert(rect) {
        // console.log(this.getIndex(rect));
        if (this.getIndex(rect) > -1 && this.children[this.getIndex(rect)]) {
            this.children[this.getIndex(rect)].insert(rect);
            return;
        }

        this.blocks.push(rect);

        if (this.blocks.length > MAX_BLOCKS && this.level < MAX_LEVELS) {
            if (!this.children.length) this.split();

            let i = 0;

            while (i < this.blocks.length) {
                let block = this.blocks[i],
                    idx = this.getIndex(block);
                if (idx > -1) {
                    this.blocks.splice(i, 1);
                    // console.log(this.children);
                    this.children[idx].insert(block);
                }
                else i++;
            }
        }

    }

    getIndex(rect) {
        let index = -1;
        const top = rect.origin.y + rect.height < this.origin.y + .5 * this.height,
            bottom = rect.origin.y > this.origin.y + .5 * this.height,
            left = rect.origin.x + rect.width < this.origin.x + .5 * this.width,
            right = rect.origin.x > this.origin.x + .5 * this.width;

        if (top && left) index = 0;
        if (top && right) index = 1;
        if (bottom && left) index = 2;
        if (bottom && right) index = 3;

        return index;

    }

    refresh(rootQuad) {
        rootQuad = rootQuad || this;
        let idx = 0;

        while (idx < this.blocks.length) {

            let childrenIndex = this.getIndex(this.blocks[idx]),
                block = this.blocks[idx];
            if (!this.isInner(block)) {
                console.log('!inner');
                this.blocks.splice(idx, 1);
                rootQuad.insert(block)
            }
            else if (childrenIndex > -1 && this.children[childrenIndex]) {
                this.blocks.splice(idx, 1);
                this.children[childrenIndex].insert(block);
                console.log('transfer ');
            }
            else idx++;
        }

        this.children.forEach(region=>region.refresh(rootQuad));
    }

    isInner(rect) {
        return (
        rect.origin.x > this.origin.x
        && rect.origin.x + rect.width < this.origin.x + this.width
        && rect.origin.y > this.origin.y
        && rect.origin.y + rect.height < this.origin.y + this.height);
    }

    walk() {
        return this.children.reduce((prev, now)=> {
            return prev.concat(now.blocks);
        }, this.blocks);
    }
}