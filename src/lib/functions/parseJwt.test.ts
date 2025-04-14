import { parseJwt } from "./parseJwt";

describe("parseJwt", () => {
  it("should correctly parse a valid JWT", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJpc3MiOiJ0ZXN0LWlzc3VlciIsInN1YiI6InRlc3Qtc3ViamVjdCIsImV4cCI6MTY4MTkzMjAwMCwiaWF0IjoxNjgxOTI4NDAwLCJqdGkiOiJ0ZXN0LWp0aSIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfQ." +
      "signature";

    const result = parseJwt(token);

    expect(result).toEqual({
      iss: "test-issuer",
      sub: "test-subject",
      exp: 1681932000,
      iat: 1681928400,
      jti: "test-jti",
      roles: ["user", "admin"],
    });
  });

  it("should throw an error for an invalid JWT format", () => {
    const invalidToken = "invalid.token";

    expect(() => parseJwt(invalidToken)).toThrowError();
  });

  it("should throw an error if the payload is not valid JSON", () => {
    const invalidJsonToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "aW52YWxpZC1qc29u." +
      "signature";

    expect(() => parseJwt(invalidJsonToken)).toThrow();
  });

  it("should throw an error for tokens with special characters in the payload", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJpc3MiOiJ0ZXN0LWlzc3VlciIsInN1YiI6InRlc3Qtc3ViamVjdCIsImV4cCI6MTY4MTkzMjAwMCwiaWF0IjoxNjgxOTI4NDAwLCJqdGkiOiJ0ZXN0LWp0aSIsInJvbGVzIjpbInVzZXIiLCJhZG1pbiJdfQ%3D%3D." +
      "signature";

    expect(() => parseJwt(token)).toThrow();
  });
});
