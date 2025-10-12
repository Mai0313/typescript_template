/**
 * Simple logger utility for CLI applications
 */
export class Logger {
  private verbose: boolean;

  constructor(verbose = false) {
    this.verbose = verbose;
  }

  /**
   * Log an info message
   */
  info(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  /**
   * Log a debug message (only shown in verbose mode)
   */
  debug(message: string, ...args: unknown[]): void {
    if (this.verbose) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }

  /**
   * Log an error message
   */
  error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  /**
   * Log a success message
   */
  success(message: string, ...args: unknown[]): void {
    console.log(`[SUCCESS] ${message}`, ...args);
  }

  /**
   * Enable or disable verbose mode
   */
  setVerbose(verbose: boolean): void {
    this.verbose = verbose;
  }
}

/**
 * Default logger instance
 */
export const logger = new Logger();

