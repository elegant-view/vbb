var connect = require('connect');
var http = require('http');
var serveStatic = require('serve-static');
var sass = require('node-sass');
var path = require('path');
var fs = require('fs');

var app = connect();

var rootPath = './';
console.log('rootPath:', rootPath);

app.use(function (req, res, next) {
    var url = require('url').parse(req.url);
    process.stdout.write(req.method + ' ' + url.pathname + '\n');
    next();
});

// 处理sass文件
app.use(function (req, res, next) {
    var url = require('url').parse(req.url);

    if (/\.scss/.test(url.pathname)) {
        var file = path.join(rootPath, url.pathname);
        try {
            res.end(sass.renderSync({file: file}).css.toString());
        }
        catch (error) {
            console.log(error.stack);
            res.statusCode = 500;
            res.end(String(error.stack));
        }
    }
    else {
        next();
    }
});

// 默认就直接发送静态文件
app.use(serveStatic('./'));

http.createServer(app).listen(3000);
