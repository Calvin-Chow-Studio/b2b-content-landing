const http = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || process.env.NODE_PORT || '3000', 10);
const hostname = '0.0.0.0';
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, hostname, () => {
        console.log(`Next.js server running on http://${hostname}:${port}`);
      });
  })
  .catch((error) => {
    console.error('Failed to start Next.js server', error);
    process.exit(1);
  });
