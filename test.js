const koa = require('koa'),
    app = koa();

app.keys = ['someSecretKey'] ;
app.use(createMiddleware1());

app.listen(5000);

function createMiddleware1() {
    return function*(next) {
        this.cookies.set('a', 'b', {signed: true, secure: true});
        this.body = 'hello';
        yield next;
    }
}



