import { beforeEach, describe, expect, it, vi } from "vitest";

import { Logger } from "@/utils/logger";

describe("Logger", () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
    vi.spyOn(console, "info").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("info", () => {
    it("should log info messages", () => {
      logger.info("Test info");

      expect(console.info).toHaveBeenCalledWith("[INFO] Test info");
    });

    it("should log info messages with additional arguments", () => {
      logger.info("Test info", { data: 123 });

      expect(console.info).toHaveBeenCalledWith("[INFO] Test info", { data: 123 });
    });
  });

  describe("debug", () => {
    it("should not log debug messages when verbose is false", () => {
      logger.debug("Test debug");

      expect(console.log).not.toHaveBeenCalled();
    });

    it("should log debug messages when verbose is true", () => {
      logger.setVerbose(true);
      logger.debug("Test debug");

      expect(console.log).toHaveBeenCalledWith("[DEBUG] Test debug");
    });
  });

  describe("warn", () => {
    it("should log warning messages", () => {
      logger.warn("Test warning");

      expect(console.warn).toHaveBeenCalledWith("[WARN] Test warning");
    });
  });

  describe("error", () => {
    it("should log error messages", () => {
      logger.error("Test error");

      expect(console.error).toHaveBeenCalledWith("[ERROR] Test error");
    });
  });

  describe("success", () => {
    it("should log success messages", () => {
      logger.success("Test success");

      expect(console.log).toHaveBeenCalledWith("[SUCCESS] Test success");
    });
  });

  describe("setVerbose", () => {
    it("should enable verbose mode", () => {
      logger.setVerbose(true);
      logger.debug("Test");

      expect(console.log).toHaveBeenCalled();
    });

    it("should disable verbose mode", () => {
      logger.setVerbose(true);
      logger.setVerbose(false);
      logger.debug("Test");

      expect(console.log).not.toHaveBeenCalled();
    });
  });
});

