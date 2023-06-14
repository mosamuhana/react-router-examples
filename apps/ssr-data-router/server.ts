import type { Request as ExpressRequest } from 'express';

import express from 'express';
import compression from 'compression';
import { resolve as resolvePath } from 'node:path';
import { readFile } from 'node:fs/promises';
import { createServer as viteCreateServer } from 'vite';
import { installGlobals } from '@remix-run/node';

type RenderFn = (url: ExpressRequest) => Promise<string>;

// Polyfill Web Fetch API
installGlobals();

const root = process.cwd();

const resolve = (p: string) => resolvePath(__dirname, p);

const distClientPath = resolve('dist/client');
const distServerEntryPath = resolve('dist/server/entry.server.js');
const srcServerEntryPath = 'src/entry.server.tsx';

const srcTemplate = () => readFile(resolve('index.html'), 'utf8');
const distTemplate = () => readFile(resolve('dist/client/index.html'), 'utf8');
const createViteDevServer = () => viteCreateServer({ root, server: { middlewareMode: 'ssr' } });

async function createDevServer() {
  const app = express();
  const vite = await createViteDevServer();

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    try {
      const template = await vite.transformIndexHtml(url, await srcTemplate());
      const render: RenderFn = await vite.ssrLoadModule(srcServerEntryPath).then((x) => x.render);

      try {
        const appHtml = await render(req);
        const html = template.replace('<!--app-html-->', appHtml);
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).end(html);
      } catch (err) {
        if (err instanceof Response && err.status >= 300 && err.status <= 399) {
          return res.redirect(err.status, err.headers.get('Location')!);
        }
        throw err;
      }
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return app;
}

async function createProdServer() {
  const app = express();

  app.use(compression());
  app.use(express.static(distClientPath));

  app.use('*', async (req, res) => {
    try {
      const template = await distTemplate();
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const render: RenderFn = require(distServerEntryPath).render;

      try {
        const appHtml = await render(req);
        const html = template.replace('<!--app-html-->', appHtml);
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).end(html);
      } catch (err) {
        if (err instanceof Response && err.status >= 300 && err.status <= 399) {
          return res.redirect(err.status, err.headers.get('Location')!);
        }
        throw err;
      }
    } catch (error) {
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return app;
}

async function createServer() {
  if (process.env.NODE_ENV === 'production') {
    return await createProdServer();
  } else {
    return await createDevServer();
  }
}

createServer().then((app) => {
  app.listen(3000, () => console.log('HTTP server is running at http://localhost:3000'));
});
