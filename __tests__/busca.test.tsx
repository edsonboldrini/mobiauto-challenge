import React from 'react'
import { render, screen } from '@testing-library/react'
import Busca from '../pages/busca'
// import { useRouter } from 'next/router'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

// test('List renders with an empty query', () => {
//   useRouter.mockReturnValue({ query: {}})
//   render(<Busca brands={[]} />)
//   const listItems = screen.getAllByRole('listitem')
//   expect(listItems[0]).toHaveTextContent('Apple')
//   expect(listItems[1]).toHaveTextContent('Banana')
//   expect(listItems[2]).toHaveTextContent('Cherry')
// })

describe('Home', () => {
  it('renders a heading', () => {
    render(<Busca brands={[]} />)

    const heading = screen.getByRole('heading', {
      name: /Tabela Fipe/i
    })

    expect(heading).toBeInTheDocument()
  })
})
