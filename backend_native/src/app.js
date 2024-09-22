const http = require('http');

const requestListener = (req, res) => {





    const { method } = req;

    if (method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        res.writeHead(200);
        res.end('Hello, World!');
    } else if (method === 'POST') {
        let body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        // }).on('end', () => {
        //     body = Buffer.concat(body).toString();
        //     console.log('Body:', body);
        //     res.end('Hello, World!');
        });
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            res.end(`Hello, ${body}!`);
        });
        // res.setHeader('Content-Type', 'application/json');
        // res.writeHead(200);
        // res.end(JSON.stringify({ message: 'Hello, World!' }));
    }

};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});