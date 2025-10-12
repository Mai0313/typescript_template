#!/usr/bin/env node

import { Command } from "commander";

import { ConfigSchema } from "@/types";
import { createSuccessResponse, formatResponse } from "@/utils/helpers";
import { logger } from "@/utils/logger";

/**
 * Main CLI function
 * Demonstrates a simple command-line application structure
 */
function main(): void {
  const program = new Command();

  program
    .name("ts-template")
    .description("A production-ready TypeScript CLI template")
    .version("0.1.0");

  program
    .command("greet")
    .description("Greet the user")
    .argument("[name]", "Name to greet", "World")
    .option("-v, --verbose", "Enable verbose logging", false)
    .option("-f, --format <format>", "Output format (json|text)", "text")
    .action((name: string, options: { verbose: boolean; format: string }) => {
      try {
        // Validate options using Zod schema
        const config = ConfigSchema.parse({
          verbose: options.verbose,
          format: options.format,
        });

        logger.setVerbose(config.verbose);
        logger.debug("Verbose mode enabled");
        logger.debug(`Greeting: ${name}`);

        const response = createSuccessResponse(`Hello, ${name}!`, {
          greeted_at: new Date().toISOString(),
          name,
        });

        const output = formatResponse(response, config.format);

        console.log(output);
      } catch (error) {
        if (error instanceof Error) {
          logger.error("Command failed", error.message);
          process.exit(1);
        }
      }
    });

  program
    .command("example")
    .description("Example command to demonstrate CLI structure")
    .option("-v, --verbose", "Enable verbose logging", false)
    .action((options: { verbose: boolean }) => {
      logger.setVerbose(options.verbose);
      logger.info("This is an example command");
      logger.debug("Add your custom logic here");

      const response = createSuccessResponse("Example command executed successfully");

      console.log(formatResponse(response));
    });

  program.parse(process.argv);

  // Show help if no command is provided
  if (process.argv.length === 2) {
    program.help();
  }
}

// Run the CLI if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };

