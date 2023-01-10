import { checkIfTheFirstLetterIsUppercase } from "../src/exercises/exercise04";


describe("test exercise01 function", () => {
  it("should return false for checkIfTheFirstLetterIsUppercase('4556364607935616')", () => {
    expect(checkIfTheFirstLetterIsUppercase('4556364607935616')).toBe(false);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase'('64607935616')", () => {
    expect(checkIfTheFirstLetterIsUppercase('64607935616')).toBe(false);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('1')", () => {
    expect(checkIfTheFirstLetterIsUppercase('1')).toBe(false);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('')", () => {
    expect(checkIfTheFirstLetterIsUppercase('')).toBe(false);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Skippy')", () => {
    expect(checkIfTheFirstLetterIsUppercase('Skippy')).toBe(true);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Nanananananananananana Batman!')", () => {
    expect(checkIfTheFirstLetterIsUppercase('Nanananananananananana Batman!')).toBe(true);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Edson')", () => {
    expect(checkIfTheFirstLetterIsUppercase('Edson')).toBe(true);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('edso')", () => {
    expect(checkIfTheFirstLetterIsUppercase('edso')).toBe(false);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Brasil')", () => {
    expect(checkIfTheFirstLetterIsUppercase('Brasil')).toBe(true);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('mobiauto')", () => {
    expect(checkIfTheFirstLetterIsUppercase('mobiauto')).toBe(false);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('xXx xXx')", () => {
    expect(checkIfTheFirstLetterIsUppercase('xXx xXx')).toBe(false);
  });
  it("should return false for checkIfTheFirstLetterIsUppercase('xDD')", () => {
    expect(checkIfTheFirstLetterIsUppercase('xDD')).toBe(false);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Deu Certo!')", () => {
    expect(checkIfTheFirstLetterIsUppercase('Deu Certo!')).toBe(true);
  });
  it("should return true for checkIfTheFirstLetterIsUppercase('Deu Certo!')", () => {
    expect(checkIfTheFirstLetterIsUppercase('   Roberto')).toBe(false);
  });
});