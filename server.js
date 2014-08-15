var http = require('http');
var url  = require('url');
var moduleRouter = require('./router');
var Router = moduleRouter.router;

http.createServer(function (request, response) {

    Router.parseRoute(request, response);

}).listen(3000, 'localhost', function () {
    console.log('Наш сервер запустился');
});