var path = require('path');
var express = require('express');
var request = require('request');
var app = express();

var rest = 'http://localhost:3232/';

// You probably want to change 'dist/' to '../dist/' for production
app.use('/', express.static(path.join(__dirname, 'dist/')));

app.get('/modules', function(req, res) {

    request(rest + 'buildQueue', function(error, response, body) {

        if (error || response.statusCode != 200) {
            return res.sendStatus(400);
        }
        body = JSON.parse(body);
        var distinctEndPoints = {};
        for (var i = 0; i < body.length; i++) {
            distinctEndPoints[body[i].endpoint] = true;
        }

        var count = 0;
        var endpoints = [];
        var nrOfEndpoints = Object.keys(distinctEndPoints).length;
        for (var endpoint in distinctEndPoints) {
            request(rest + 'buildQueue?endpoint='+ endpoint +'&limit=1&sort=-createdAt', function (error, response, body) {

                if (error || response.statusCode != 200) {
                    return res.sendStatus(400);
                }
                endpoints.push(JSON.parse(body)[0]);
                count++;
                if (count == nrOfEndpoints) {
                     return res.status(200).send(endpoints);
                }

            });
        }
    });

});

var server = app.listen(9000, function () {
    console.log('Server started: http://localhost:%s/', server.address().port);
});
