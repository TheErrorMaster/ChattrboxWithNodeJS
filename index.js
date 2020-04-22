var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
const mime = require('mime');
// part 1
var handleError = function (err, res) {
    // part 3
    var test = [
        'error.html', // html [0] & part 2
        'pdf_sample.pdf', // pdf [1]
        'picture_sample.jpg', // picture [2]
        'sound_sample.mp3', // sound[3]
        'video_sample.mp4', // video [4]
        'plain_sample.txt' // plain text [5]
    ] // move to anotherpage
    var errPath = __dirname + '/app/' + test[0];
    fs.readFile(errPath, function (err, data) { 
        if (err) { 
            throw err;
        } else {
            mimeTypeError = mime.getType(errPath);
            console.log("MIME: " + mimeTypeError);
            res.setHeader('Content-Type', mimeTypeError);
            res.end(data);
        }
    })
};

var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res);
            return;
        } else {
            mimeType = mime.getType(filePath);
            console.log('MIME: ' + mimeType);
            res.setHeader('Content-Type', mimeType);
            res.end(data);
        }
    });
});
server.listen(3000);