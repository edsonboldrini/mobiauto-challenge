export interface IMarca {
  nome: string
  codigo: string
}

export interface IModelo {
  nome: string
  codigo: string
}

export interface IYear {
  nome: string
  codigo: string
}

export interface ICarData {
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  TipoVeiculo: number
  SiglaCombustivel: string
}