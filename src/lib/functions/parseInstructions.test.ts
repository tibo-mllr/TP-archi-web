import { parseInstructions } from "./parseInstructions";

describe("parseInstructions", () => {
  it("should parse instructions into a list when they start with '-'", () => {
    const instructions = "- Item 1\n- Item 2\n- Item 3";
    const result = parseInstructions(instructions);
    expect(result.type).toBe("ul");
    expect(result.props.children.length).toBe(3);
  });

  it("should parse instructions into paragraphs when they don't start with '-'", () => {
    const instructions = "This is a paragraph.\nThis is another paragraph.";
    const result = parseInstructions(instructions);
    expect(result.type).toBe("div");
    expect(result.props.children.length).toBe(2);
  });

  it("should handle empty instructions", () => {
    const result = parseInstructions();
    expect(result.type).toBe("div");
    expect(result.props.children).toBeUndefined();
  });
});
