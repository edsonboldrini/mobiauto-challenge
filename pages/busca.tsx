import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { red } from '@mui/material/colors'
import InputLabel from '@mui/material/InputLabel'
import { CircularProgress, FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IBrand, IModel, IYear } from '../src/types'
import { useRouter } from 'next/router'
import { FipeService } from '../src/services/FipeService'
import { useForm } from '../src/hooks/useForm'
import Head from 'next/head'
import theme from '../src/config/theme'
import DefaultLayout from '../src/layouts/DefaultLayout'
import StyledContainer from '../src/components/StyledContainer'

interface BuscaProps {
  brands: IBrand[] | null
}

const StyledForm = styled('form')(({ theme }) => ({
  width: '50%',
  padding: 48,
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    padding: 24
  }
}))

const StyledErrorMessage = styled('p')(({ theme }) => ({
  margin: '0px',
  color: 'red'
}))

export default function Busca({ brands }: BuscaProps) {
  const router = useRouter()
  const [models, setModels] = useState<IModel[] | null>(null)
  const [years, setYears] = useState<IYear[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentForm = useForm({
    initialValues: {
      brand: '',
      model: '',
      year: ''
    },
    validate: (values) => {
      const errors: { [key: string]: any } = {}
      if (!values?.brand) {
        errors.brand = 'Obrigatório'
      }
      if (!values?.model) {
        errors.model = 'Obrigatório'
      }
      if (!values?.year) {
        errors.year = 'Obrigatório'
      }
      return errors
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      const { brand, model, year } = values

      router.push(`/resultado/${brand}/${model}/${year}`)
    }
  })

  const handleBrandChange = async (event: SelectChangeEvent<string>) => {
    currentForm.handleChange(event)

    if (event.target.value) {
      setIsLoading(true)
      const newModels: IModel[] | null = await FipeService.getAllModelsByBrand(event.target.value)

      if (newModels?.length) {
        setModels(newModels)
      }
      setIsLoading(false)
    }
  }

  const handleModelChange = async (event: SelectChangeEvent<string>) => {
    currentForm.handleChange(event)

    if (event.target.value) {
      setIsLoading(true)
      const newYears: IModel[] | null = await FipeService.getAllYearsByBrandAndModel(
        currentForm.values.brand,
        event.target.value
      )

      if (newYears?.length) {
        setYears(newYears)
      }
      setIsLoading(false)
    }
  }

  return (
    <DefaultLayout metaTitle="Mobiauto Challenge - Busca">
      <StyledContainer backgroundColor={red[50]}>
        <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
          Tabela Fipe
        </Typography>
        <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Consulte o valor de um veículo de forma gratuita
        </Typography>
        <StyledForm onSubmit={currentForm.handleSubmit} noValidate>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="brands-select">Marca</InputLabel>
            <Select
              labelId="brands-select"
              id="brand"
              name="brand"
              label="Marca"
              margin="none"
              required
              fullWidth
              value={currentForm.values.brand}
              onChange={handleBrandChange}
            >
              {brands?.map((element) => (
                <MenuItem value={element.codigo} key={element.codigo}>
                  {element.nome}
                </MenuItem>
              ))}
            </Select>
            <StyledErrorMessage>{currentForm.errors.brand}</StyledErrorMessage>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="models-select">Modelo</InputLabel>
            <Select
              labelId="models-select"
              id="model"
              name="model"
              label="Modelo"
              margin="none"
              required
              fullWidth
              disabled={isLoading || !currentForm.values.brand}
              value={currentForm.values.model}
              onChange={handleModelChange}
            >
              {models?.map((element) => (
                <MenuItem value={element.codigo} key={element.codigo}>
                  {element.nome}
                </MenuItem>
              ))}
            </Select>
            <StyledErrorMessage>{currentForm.errors.model}</StyledErrorMessage>
          </FormControl>
          {!currentForm.values.model ? (
            <></>
          ) : (
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel id="years-select">Ano</InputLabel>
              <Select
                labelId="years-select"
                id="year"
                name="year"
                label="Ano"
                margin="none"
                required
                fullWidth
                disabled={isLoading || !currentForm.values.model}
                value={currentForm.values.year}
                onChange={currentForm.handleChange}
              >
                {years?.map((element) => (
                  <MenuItem value={element.codigo} key={element.codigo}>
                    {element.nome}
                  </MenuItem>
                ))}
              </Select>
              <StyledErrorMessage>{currentForm.errors.year}</StyledErrorMessage>
            </FormControl>
          )}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {
              isLoading ?
                <CircularProgress /> :
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isLoading || !currentForm.values.brand || !currentForm.values.model || !currentForm.values.year}
                >
                  Consultar preço
                </Button>
            }
            <Typography sx={{ color: theme.palette.grey[200], textAlign: 'center', mt: 2 }}>Código fonte disponível em: <a href='https://github.com/edsonboldrini/mobiauto-challenge' style={{ color: theme.palette.grey[200] }}>https://github.com/edsonboldrini/mobiauto-challenge</a></Typography>
          </Box>
        </StyledForm>
      </StyledContainer>
    </DefaultLayout >
  )
}

export async function getStaticProps(context: any) {
  const brands = await FipeService.getAllBrands() ?? []

  return {
    props: {
      brands
    },
    revalidate: 600
  }
}
