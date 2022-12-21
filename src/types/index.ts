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

export interface IValor {
  valor: string
  marca: string
  modelo: string
  anoModelo: number
  combustivel: string
  codigoFipe: string
  mesReferencia: string
  tipoVeiculo: number
  siglaCombustivel: string
}