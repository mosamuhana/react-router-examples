import express from 'express';
import compression from 'compression';
import { resolve as resolvePath } from 'node:path';
import { readFile } from 'node:fs/promises';
import { createServer as viteCreateServer } from 'vite';

type RenderFn = (url: string) => string;

const root = process.cwd();

const resolve = (p: string) => resolvePath(__dirname, p);

const distServerEntryPath = resolve('dist/server/entry.server.js');
const srcServerEntryPath = 'src/entry.server.tsx';
const distClientPath = resolve('dist/client');

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
      const render: RenderFn = await vite.ssrLoadModule(srcServerEntryPath).then((m) => m.render);
      const html = template.replace('<!--app-html-->', render(url));
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).end(html);
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
    const url = req.originalUrl;

    try {
      const template = await distTemplate();
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const render: RenderFn = require(distServerEntryPath).render;
      const html = template.replace('<!--app-html-->', render(url));
      res.setHeader('Content-Type', 'text/html');
      return res.status(200).end(html);
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

createServer().then(app => {
  app.listen(3000, () => console.log('HTTP server is running at http://localhost:3000'));
});
