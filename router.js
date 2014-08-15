/**
 * Created by Vadim on 01.08.14.
 */
var url = require('url');
var fs = require('fs');

var Router  = {

    parseRoute: function (request, response) {
        var parsedUrl = url.parse(request.url);
        parsedUrl.pathname = parsedUrl.pathname.substring(1);

        console.log(parsedUrl.pathname )

        if (parsedUrl.pathname == '') {
            this.index(request, response);
        } else if (this[parsedUrl.pathname]) {
            this[parsedUrl.pathname](request, response)
        } else {
            this.defaultRoute(request, response);
        }

    },

    "magazykaCSS.html":function (request, response) {

        fs.readFile(__dirname + '/html/magazykaCSS.html', function (err, data) {
            if (err) throw err;

            response.end(data);

        });

    },
    index: function (request, response) {

        fs.readFile(__dirname + '/html/magazyka.html', function (err, data) {
            if (err) throw err;

            response.end(data);

        });

    },
    order: function (request, response) {

        fs.readFile(__dirname + '/html/order.html', function (err, data) {
            if (err) throw err;

            response.end(data);

        });

    },
    "magazykaJS.js":function (request, response) {

        fs.readFile(__dirname + '/magazykaJS.js', function (err, data) {
            if (err) throw err;

            response.end(data);

        });

    },
    "jquery.js":function (request, response) {

        fs.readFile(__dirname + '/jquery.js', function (err, data) {
            if (err) throw err;

            response.end(data);

        });

    },
    cart: function (request, response) {

        fs.readFile(__dirname + '/html/cart.html', function (err, data) {
            if (err) throw err;

            response.end(data);

        });


    },
    defaultRoute: function (request, response) {
        response.writeHead(404, {
            'Content-Type': 'text/plain' });
        response.end('not found');
    }

};

module.exports.router = Router;


module.exports.someother = function () {

};