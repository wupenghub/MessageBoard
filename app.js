var http = require('http');
var fs = require('fs');

function readFile(path, response) {
    fs.readFile(path, function (error, content) {
        console.log("path：" + path);
        if (error) {
            response.end('404 not found');
        }
        response.end(content);
    });
}

http.createServer(function (request, response) {
    if (request.url === '/') {
        readFile('./views/index.html', response);
    } else if (request.url.indexOf('/public/') === 0) {
        readFile('.' + request.url, response);
    } else if (request.url === '/post') {
        readFile('./views/post.html', response);
    } else {
        readFile('./views/404.html', response);
    }
}).listen('3000', function () {
    console.log('服务已经启动')
});