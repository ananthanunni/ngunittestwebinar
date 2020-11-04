export class Logger {
  static error(module: string, method: string, message: string): void {
    console.error(`${module}.${method}`, message);
  }
}
