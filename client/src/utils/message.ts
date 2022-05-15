export class Message extends Error {
  constructor(message: any) {
    super(message);
    this.name = '[Blog]';
  }
}

export const throwError = (scope: string, message: any) => {
  throw new Message(`[${scope}] ${message}`);
};

export const BlogLog = (scope: string, message: any, ...options: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Blog]: [${scope}] %s`, message, ...options);
  }
};

export const BlogWarn = (scope: string, message: any, ...options: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Blog]: [${scope}] %s`, message, ...options);
  }
};
