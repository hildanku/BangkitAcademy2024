const http = require('http');

const requestListener = (req, res) => {
    const { url, method } = req;

    if(url === '/') {
        if(method !== 'GET') {
            res.writeHead(405);
            res.end('Method Not Allowed');
        }
        res.writeHead(200);
        res.end('HomePage');
    } else if (url === '/about') {
        if(method === 'POST') {
            let body = [];

            req.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                x = Buffer.concat(body);
                console.log('Body:', x);
                body = Buffer.concat(body).toString();
                // console.log('Body:', body);
                res.end(`Hello, ${body}!, ini adalah halaman about`);
                return
            });
        } else {
            res.writeHead(405);
            res.end('Method Not Allowed');
        }
        res.writeHead(200);
        res.end('Halo Pengunjung');
        
    }
};

const server = http.createServer(requestListener);

const port = 3000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});