import type { Request } from 'express';

export function copyRequestheaders(headers: Request['headers']) {
  const copy = new Headers();

  Object.entries(headers).forEach(([key, values]) => {
    if (values) {
      if (Array.isArray(values)) {
        values.forEach(value => copy.append(key, value));
      } else {
        copy.set(key, values);
      }
    }
  });

  return copy;
}

export function getUrl(req: Request) {
  const { protocol, originalUrl, url } = req;
  const origin = `${protocol}://${req.get('host')}`;
  // Note: This had to take originalUrl into account for presumably vite's proxying
  const newUrl = new URL(originalUrl || url, origin);
  return newUrl.href;
}
