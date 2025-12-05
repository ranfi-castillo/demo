const express = require('express');
const app = express();

const VERSION = process.env.APP_VERSION || '1.0.0';
const PORT = process.env.PORT || 3000;
const ENV = process.env.APP_ENV || 'dev';

app.get('/version', (_, res) => {
  return res.json({version: VERSION});
});

app.get('/', (req, res) => {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Demo - ${ENV}</title>
    <style>
      body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; text-align: center; margin-top: 20vh; }
      h1 { font-size: 4rem; margin-bottom: 0.5rem; }
      p  { font-size: 1.25rem; color: #555; }
    </style>
  </head>
  <body>
    <h1>Hello from: <strong>${ENV}</strong>!</h1>
  </body>
  <script>
    var lastVersion = '';
    async function getVersion() {
      try {
        const response = await fetch('/version');
        if (response.ok) {
          const data = await response.json();
          const version = data.version;

          console.log('version:', version);

          if (lastVersion && lastVersion !== version) {
            window.location.reload();
          }
          
          lastVersion = version;
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
      
    setInterval(getVersion, 1000);
  </script>
  </html>`;
  res.set('Content-Type', 'text/html');
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (env: ${ENV})`);
});
``
