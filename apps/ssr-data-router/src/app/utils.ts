export const delay = (n = 500) => new Promise<void>((r) => setTimeout(r, n));

export const rand = () => Math.round(Math.random() * 100);
