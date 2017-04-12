import Region from './region' ;
import Block from './block';

const
    count = 30,
    blockWidth = 30,
    blockHeight = 30,
    width = 500,
    height = 500,
    raf = requestAnimationFrame;

export default canvas=> {
    canvas.width = width;
    canvas.height = height;


    const wrapEveryFrame = ()=> {
        // raf(wrapEveryFrame);
        everyFrame(canvas.getContext('2d'), width, height);
    };

    wrapEveryFrame();

    let rootQuad;

    function everyFrame(ctx, width, height) {
        if (!rootQuad) {
            rootQuad = new Region({
                origin: {x: 0, y: 0},
                width,
                height,
                level: 0
            });

            /* test */
            let i = 0;
            while (i < count) {
                rootQuad.insert(
                    new Block({
                            origin: {
                                x: 1 + parseInt((width - blockWidth - 2 ) * Math.random(), 10),
                                y: 1 + parseInt((height - blockHeight -2 ) * Math.random(), 10)
                            },
                            width: blockWidth,
                            height: blockHeight
                        }
                    ));
                i++;
            }
        }

        ctx.clearRect(0, 0, width, height);
        rootQuad.render(ctx);
        rootQuad.refresh();
    }
}