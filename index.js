const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/worker.js') {
        res.writeHead(200, {
            'Content-Type': 'text/javascript; charset=utf-8',
        });

        res.end(fs.readFileSync('./worker.js'));

        return;
    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });

    res.end(fs.readFileSync(
        req.url === '/iframe' ?
            './foo.localhost.iframe.html' :
            './foo.localhost.index.html'
    ));
}).listen(1234, () => console.log('Visit: http://foo.localhost:1234/'));

http.createServer((_req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    })

    res.end(fs.readFileSync('./bar.localhost.index.html'));
}).listen(2345);