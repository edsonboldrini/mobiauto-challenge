export interface IBrand {
  nome: string
  codigo: string
}

export interface IModel {
  nome: string
  codigo: string
}

export interface IYear {
  nome: string
  codigo: string
}

export interface IVehicleData {
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