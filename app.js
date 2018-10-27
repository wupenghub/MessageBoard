var http = require('http');
var fs = require('fs');
http.createServer(function (request,response) {
    if(request.url.indexOf('/public/') === 0){
        fs.readFile(request.url,function (error,content) {
            if(error){
                response.end('404 not found');
            }
            response.end(content);
        })
    }


}).listen('3000',function () {
    console.log('服务已经启动')
});