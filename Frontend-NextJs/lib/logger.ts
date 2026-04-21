import { ENV } from './env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private isDev = ENV.NODE_ENV === 'development';

  private format(level: LogLevel, message: string, meta?: unknown) {
    return {
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };
  }

  info(message: string, meta?: unknown) {
    if (!this.isDev) return;
    console.log(this.format('info', message, meta));
  }

  warn(message: string, meta?: unknown) {
    console.warn(this.format('warn', message, meta));
  }

  error(message: string, error?: unknown) {
    console.error(this.format('error', message, error));
  }

  debug(message: string, meta?: unknown) {
    if (!this.isDev) return;
    console.debug(this.format('debug', message, meta));
  }
}

export const logger = new Logger();
