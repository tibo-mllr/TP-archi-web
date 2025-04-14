import { capitalizeFirstLetter } from "./capitalizeFirstLetter";

describe("capitalizeFirstLetter.test", () => {
  it("should capitalize the first letter of a string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
    expect(capitalizeFirstLetter("world")).toBe("World");
  });

  it("should return an empty string when given an empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("should handle strings with only one character", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
    expect(capitalizeFirstLetter("Z")).toBe("Z");
  });

  it("should handle strings with mixed case", () => {
    expect(capitalizeFirstLetter("hELLO")).toBe("Hello");
    expect(capitalizeFirstLetter("wORLD")).toBe("World");
  });
});
