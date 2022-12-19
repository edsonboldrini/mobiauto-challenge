import { maskify } from "../src/exercise01";


describe("test exercise01 function", () => {
  it("should return '############5616' for maskify('4556364607935616')", () => {
    expect(maskify('4556364607935616')).toBe('############5616');
  });
  it("should return '#######5616' for maskify'('64607935616')", () => {
    expect(maskify('64607935616')).toBe('#######5616');
  });
  it("should return '1' for maskify('1')", () => {
    expect(maskify('1')).toBe('1');
  });
  it("should return '' for maskify('')", () => {
    expect(maskify('')).toBe('');
  });
  it("should return '##ippy' for maskify('Skippy')", () => {
    expect(maskify('Skippy')).toBe('##ippy');
  });
  it("should return '##########################man!' for maskify('Nanananananananananana Batman!')", () => {
    expect(maskify('Nanananananananananana Batman!')).toBe('##########################man!');
  });
  it("should return '#dson' for maskify('Edson')", () => {
    expect(maskify('Edson')).toBe('#dson');
  });
  it("should return 'edso' for maskify('edso')", () => {
    expect(maskify('edso')).toBe('edso');
  });
});