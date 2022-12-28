import React from 'react'
import { render, screen } from '@testing-library/react'
import Resultado from '../pages/resultado/[brand]/[model]/[year]/index'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Home', () => {
  it('renders a heading', () => {
    render(<Resultado vehicleData={{
      Valor: "R$ 111.957,00",
      Marca: "Toyota",
      Modelo: "Corolla XRS 2.0 Flex 16V Aut.",
      AnoModelo: 2019,
      Combustivel: "Gasolina",
      CodigoFipe: "002115-6",
      MesReferencia: "dezembro de 2022 ",
      TipoVeiculo: 1,
      SiglaCombustivel: "G"
    }} />)

    const heading = screen.getByRole('heading', {
      name: /Tabela Fipe Preço: Toyota Corolla XRS 2.0 Flex 16V Aut. 2019 Gasolina/i
    })

    expect(heading).toBeInTheDocument()
  })
})
