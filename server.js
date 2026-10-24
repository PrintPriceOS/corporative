const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Next.js en modo producción forzado
const dev = false;
const port = parseInt(process.env.PORT || '3010', 10);

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        console.error('Error procesando petición HTTP:', err);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.on('error', (err) => {
      console.error('Error fatal en el servidor HTTP:', err);
      process.exit(1);
    });

    server.listen(port, (err) => {
      if (err) {
        console.error(`Fallo al escuchar en el puerto ${port}:`, err);
        process.exit(1);
      }
      console.log(`> Servidor Next.js listo en puerto ${port} (RELEASE_ID: ${process.env.RELEASE_ID || 'unspecified'})`);
    });
  })
  .catch((err) => {
    console.error('Fallo fatal en app.prepare():', err);
    process.exit(1);
  });
