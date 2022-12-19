import { updateData } from "../src/exercises/exercise02";

describe("test exercise02 function", () => {
  it("should return { name: 'Marcos', country: 'Japão', age: 33 }", () => {
    expect(updateData({ name: 'Marcos', country: 'Brasil', age: 22 }, { country: 'Japão', age: 33 })).toEqual({ name: 'Marcos', country: 'Japão', age: 33 });
  });
  it("should return { name: 'Marcos', country: 'Brasil', age: 22 }", () => {
    expect(updateData({ name: 'Marcos', country: 'Brasil', age: 22 }, { price: 89.9, amount: 15, description: 'camiseta 100% algodão' })).toEqual({ name: 'Marcos', country: 'Brasil', age: 22 });
  });
  it("should return { name: 'Camiseta Polo', country: 'Chile', age: 42 }", () => {
    expect(updateData({ name: 'Rafael', country: 'Chile', age: 42 }, { name: 'Camiseta Polo', price: 59.9, amount: 30 })).toEqual({ name: 'Camiseta Polo', country: 'Chile', age: 42 })
  });
  it("should return { name: 'Camiseta Polo', country: 'Chile', age: null }", () => {
    expect(updateData({ name: 'Rafael', country: 'Chile', age: 42 }, { name: 'Camiseta Polo', price: 59.9, amount: 30, age: null })).toEqual({ name: 'Camiseta Polo', country: 'Chile', age: null })
  });
});