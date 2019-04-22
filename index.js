'use strict';

const express = require('express');
const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5555;

app.get('/favicon.ico', (req, res, next) => {
  const startView = Date.now();

  res.writeHead(200, {
    'Content-Type': 'image/x-icon',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });

  const intvl = setInterval(() => res.write(' '), 2000);

  res.on('timeout', () => {
    console.log('res timed out');
    clearInterval(intvl);
  });

  res.on('close', () => {
    const endView = Date.now();
    const duration = ((endView - startView) / 1000).toFixed(2);

    console.log(`visit took ${duration} s`);
  });
});

app.get('/', (req, res, next) => {
  res.send(`<a href="/page2">Go to /page2</a>`);
});

app.get('/page2', (req, res, next) => {
  res.send(`<a href="/">Return to main page.</a>`);
});

app.listen(port, () => console.log(`app listening on port ${port}`));
