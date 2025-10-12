import { describe, expect, it } from "vitest";

import {
  createErrorResponse,
  createSuccessResponse,
  createWarningResponse,
  formatResponse,
} from "@/utils/helpers";

describe("helpers", () => {
  describe("createSuccessResponse", () => {
    it("should create a success response", () => {
      const message = "Operation successful";
      const data = { result: 42 };

      const response = createSuccessResponse(message, data);

      expect(response.status).toBe("success");
      expect(response.message).toBe(message);
      expect(response.data).toEqual(data);
      expect(response.timestamp).toBeInstanceOf(Date);
    });

    it("should create a success response without data", () => {
      const message = "Operation successful";

      const response = createSuccessResponse(message);

      expect(response.status).toBe("success");
      expect(response.message).toBe(message);
      expect(response.data).toBeUndefined();
    });
  });

  describe("createErrorResponse", () => {
    it("should create an error response", () => {
      const message = "Operation failed";
      const data = { code: "ERR_001" };

      const response = createErrorResponse(message, data);

      expect(response.status).toBe("error");
      expect(response.message).toBe(message);
      expect(response.data).toEqual(data);
      expect(response.timestamp).toBeInstanceOf(Date);
    });
  });

  describe("createWarningResponse", () => {
    it("should create a warning response", () => {
      const message = "Deprecated feature";

      const response = createWarningResponse(message);

      expect(response.status).toBe("warning");
      expect(response.message).toBe(message);
      expect(response.timestamp).toBeInstanceOf(Date);
    });
  });

  describe("formatResponse", () => {
    it("should format response as JSON", () => {
      const response = createSuccessResponse("Test", { value: 123 });

      const formatted = formatResponse(response, "json");

      const parsed = JSON.parse(formatted);

      expect(parsed.status).toBe("success");
      expect(parsed.message).toBe("Test");
      expect(parsed.data).toEqual({ value: 123 });
    });

    it("should format response as text", () => {
      const response = createSuccessResponse("Test", { value: 123 });

      const formatted = formatResponse(response, "text");

      expect(formatted).toContain("✓");
      expect(formatted).toContain("SUCCESS");
      expect(formatted).toContain("Test");
      expect(formatted).toContain('"value": 123');
    });

    it("should format error response with emoji", () => {
      const response = createErrorResponse("Failed");

      const formatted = formatResponse(response, "text");

      expect(formatted).toContain("✗");
      expect(formatted).toContain("ERROR");
    });

    it("should format warning response with emoji", () => {
      const response = createWarningResponse("Warning");

      const formatted = formatResponse(response, "text");

      expect(formatted).toContain("⚠");
      expect(formatted).toContain("WARNING");
    });
  });
});

