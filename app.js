var http = require('http');
var fs = require('fs');
var artTempalte = require('art-template');
var url = require('url');
var moment = require('moment');
var comments = [];

function readFile(path, handleContent) {
    fs.readFile(path, function (error, content) {
        if (error) {
            content = null;
        }
        handleContent(content);
    });
}

http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    if (urlObj.pathname === '/') {
        readFile('./views/index.html', function (content) {
            if (content) {
                var html = artTempalte.render(content.toString(), {
                    comments: comments
                });
                response.end(html);
            } else {
                response.end("404 Not Found");
            }
        });
    } else if (urlObj.pathname.indexOf('/public/') === 0) {
        readFile('.' + request.url, function (content) {
            if (content)
                response.end(content);
            else
                response.end("404 Not Found");
        });
    } else if (urlObj.pathname === '/post') {
        readFile('./views/post.html', function (content) {
            if (content)
                response.end(content);
            else
                response.end("404 Not Found");
        });
    } else if (urlObj.pathname === '/publishedComment') {
        var commentObj = urlObj.query;
        comments.unshift({
            name: commentObj.name,
            content: commentObj.message,
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });
        response.statusCode = 302;
        response.setHeader('Location', '/');
        response.end();
    } else {
        readFile('./views/404.html', function (content) {
            if (content)
                response.end(content);
            else
                response.end("404 Not Found");
        });
    }
}).listen('3000', function () {
    console.log('服务已经启动')
});