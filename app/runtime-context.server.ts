export type RuntimeLoadContext = {
  SESSION_SECRET: string;
  waitUntil(promise: Promise<unknown>): void;
};
