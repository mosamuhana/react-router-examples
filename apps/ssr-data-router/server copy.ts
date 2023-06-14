import { resolve as resolvePath } from 'node:path';
import { readFile } from 'node:fs/promises';
import type { Request as ExpressRequest } from 'express';
import express from 'express';
import compression from 'compression';
import type { ViteDevServer } from 'vite';
import { createServer as viteCreateServer } from 'vite';
import { installGlobals } from '@remix-run/node';

// Polyfill Web Fetch API
installGlobals();

const root = process.cwd();
const isDev = process.env.NODE_ENV !== 'production';

const resolve = (p: string) => resolvePath(__dirname, p);

const distServerEntryPath = resolve('dist/server/entry.server.js');
const srcServerEntryPath = 'src/entry.server.tsx';
const srcIndexHtmlPath = resolve('index.html');
const distIndexHtmlPath = resolve('dist/client/index.html');
const distClientPath = resolve('dist/client');

async function createServer() {
  const app = express();
  let vite: ViteDevServer;

  if (isDev) {
    vite = await viteCreateServer({ root, server: { middlewareMode: 'ssr' } });

    app.use(vite.middlewares);
  } else {
    app.use(compression());
    app.use(express.static(distClientPath));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template: string;
      let render: (url: ExpressRequest) => string;

      if (isDev) {
        template = await readFile(srcIndexHtmlPath, 'utf8');
        template = await vite.transformIndexHtml(url, template);
        render = await vite.ssrLoadModule(srcServerEntryPath).then((x) => x.render);
      } else {
        template = await readFile(distIndexHtmlPath, 'utf8');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        render = require(distServerEntryPath).render;
      }

      try {
        const appHtml = await render(req);
        const html = template.replace('<!--app-html-->', appHtml);
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).end(html);
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get('Location')!);
        }
        throw e;
      }
    } catch (error) {
      if (isDev) {
        vite.ssrFixStacktrace(error);
      }
      console.log(error.stack);
      res.status(500).end(error.stack);
    }
  });

  return app;
}

createServer().then((app) => {
  app.listen(3000, () => {
    console.log('HTTP server is running at http://localhost:3000');
  });
});
