import type { Response } from "@/types";

/**
 * Create a success response object
 *
 * @param message - Success message
 * @param data - Optional data payload
 * @returns Response object with success status
 *
 * @example
 * ```typescript
 * const response = createSuccessResponse("Operation completed", { result: 42 });
 * ```
 */
export function createSuccessResponse(message: string, data?: unknown): Response {
  return {
    status: "success",
    message,
    data,
    timestamp: new Date(),
  };
}

/**
 * Create an error response object
 *
 * @param message - Error message
 * @param data - Optional error details
 * @returns Response object with error status
 *
 * @example
 * ```typescript
 * const response = createErrorResponse("Operation failed", { code: "ERR_001" });
 * ```
 */
export function createErrorResponse(message: string, data?: unknown): Response {
  return {
    status: "error",
    message,
    data,
    timestamp: new Date(),
  };
}

/**
 * Create a warning response object
 *
 * @param message - Warning message
 * @param data - Optional warning details
 * @returns Response object with warning status
 *
 * @example
 * ```typescript
 * const response = createWarningResponse("Deprecated feature used");
 * ```
 */
export function createWarningResponse(message: string, data?: unknown): Response {
  return {
    status: "warning",
    message,
    data,
    timestamp: new Date(),
  };
}

/**
 * Format a Response object for output
 *
 * @param response - Response object to format
 * @param format - Output format ('json' or 'text')
 * @returns Formatted string representation
 */
export function formatResponse(response: Response, format: "json" | "text" = "text"): string {
  if (format === "json") {
    return JSON.stringify(response, null, 2);
  }

  const statusEmoji = {
    success: "✓",
    error: "✗",
    warning: "⚠",
  };

  const emoji = statusEmoji[response.status];
  let output = `${emoji} ${response.status.toUpperCase()}: ${response.message}`;

  if (response.data !== undefined) {
    output += `\nData: ${JSON.stringify(response.data, null, 2)}`;
  }

  output += `\nTimestamp: ${response.timestamp.toISOString()}`;

  return output;
}

