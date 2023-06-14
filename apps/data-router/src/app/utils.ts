export function delay(ms = 500) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export const rand = () => Math.round(Math.random() * 100);

export const resolve = (d: string, ms: number) =>
  new Promise<string>(r => setTimeout(() => r(`${d} - ${rand()}`), ms));

export const reject = <T = unknown>(d: Error | string, ms: number) =>
  new Promise<T>((_, r) =>
    setTimeout(() => {
      if (d instanceof Error) {
        d.message += ` - ${rand()}`;
      } else {
        d += ` - ${rand()}`;
      }
      r(d);
    }, ms)
  );
