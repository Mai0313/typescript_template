import { z } from "zod";

/**
 * Response schema for CLI operations
 *
 * @example
 * ```typescript
 * const response: Response = {
 *   status: "success",
 *   message: "Operation completed successfully",
 *   timestamp: new Date()
 * };
 * ```
 */
export const ResponseSchema = z.object({
  status: z.enum(["success", "error", "warning"]).describe("Operation status"),
  message: z.string().describe("Human-readable message"),
  data: z.unknown().optional().describe("Optional data payload"),
  timestamp: z.date().describe("Response timestamp"),
});

/**
 * Inferred TypeScript type from ResponseSchema
 */
export type Response = z.infer<typeof ResponseSchema>;

/**
 * Configuration options for the CLI
 */
export const ConfigSchema = z.object({
  verbose: z.boolean().default(false).describe("Enable verbose logging"),
  output: z.string().optional().describe("Output file path"),
  format: z.enum(["json", "text"]).default("text").describe("Output format"),
});

/**
 * Inferred TypeScript type from ConfigSchema
 */
export type Config = z.infer<typeof ConfigSchema>;

