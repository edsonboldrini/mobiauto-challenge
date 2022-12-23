import React from 'react'
import { render, screen } from '@testing-library/react'
import Busca from '../pages/busca'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Busca brands={[]}/>)

    const heading = screen.getByRole('heading', {
      name: /Tabela Fipe/i,
    })

    expect(heading).toBeInTheDocument()
  })
})