import React from 'react'
import { render, screen } from '@testing-library/react'
import Resultado from '../pages/resultado'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Home', () => {
  it('renders a heading', () => {
    render(<Resultado vehicleData={{
      Valor: 'R$ 4.121,00',
      Marca: 'Baby',
      Modelo: 'Buggy 1.6 2-Lug.',
      AnoModelo: 1993,
      Combustivel: 'Gasolina',
      CodigoFipe: '040001-7',
      MesReferencia: 'dezembro de 2022 ',
      TipoVeiculo: 1,
      SiglaCombustivel: 'G'
    }} />)

    const heading = screen.getByRole('heading', {
      name: /Tabela Fipe: Preço Buggy 1.6 2-Lug./i
    })

    expect(heading).toBeInTheDocument()
  })
})
