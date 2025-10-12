import { describe, expect, it } from "vitest";

import { ConfigSchema, ResponseSchema } from "@/types";

describe("types", () => {
  describe("ResponseSchema", () => {
    it("should validate a valid response", () => {
      const validResponse = {
        status: "success",
        message: "Test message",
        timestamp: new Date(),
      };

      const result = ResponseSchema.safeParse(validResponse);

      expect(result.success).toBe(true);
    });

    it("should validate a response with data", () => {
      const validResponse = {
        status: "error",
        message: "Test error",
        data: { code: "ERR_001" },
        timestamp: new Date(),
      };

      const result = ResponseSchema.safeParse(validResponse);

      expect(result.success).toBe(true);
    });

    it("should reject invalid status", () => {
      const invalidResponse = {
        status: "invalid",
        message: "Test",
        timestamp: new Date(),
      };

      const result = ResponseSchema.safeParse(invalidResponse);

      expect(result.success).toBe(false);
    });

    it("should reject missing required fields", () => {
      const invalidResponse = {
        status: "success",
        // missing message and timestamp
      };

      const result = ResponseSchema.safeParse(invalidResponse);

      expect(result.success).toBe(false);
    });
  });

  describe("ConfigSchema", () => {
    it("should validate with default values", () => {
      const config = {};

      const result = ConfigSchema.parse(config);

      expect(result.verbose).toBe(false);
      expect(result.format).toBe("text");
    });

    it("should validate custom values", () => {
      const config = {
        verbose: true,
        output: "/tmp/output.txt",
        format: "json",
      };

      const result = ConfigSchema.parse(config);

      expect(result.verbose).toBe(true);
      expect(result.output).toBe("/tmp/output.txt");
      expect(result.format).toBe("json");
    });

    it("should reject invalid format", () => {
      const config = {
        format: "xml",
      };

      expect(() => ConfigSchema.parse(config)).toThrow();
    });
  });
});

