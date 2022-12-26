export const FipeService = {
  async getAllBrands() {
    try {
      const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
      const data = await response.json()

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  },
  async getAllModelsByBrand(brand: string) {
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`)
      const data = await response.json()

      return data.modelos
    } catch (e) {
      console.log(e)
      return null
    }
  },
  async getAllYearsByBrandAndModel(brand: string, model: string) {
    try {
      const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos`)
      const data = await response.json()

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  },
  async getVehicleData(brand: string, model: string, year: string) {
    try {
      const response = await fetch(
        `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${year}`
      )
      const data = await response.json()

      return data
    } catch (e) {
      console.log(e)
      return null
    }
  }
}