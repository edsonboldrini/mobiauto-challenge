import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { red } from '@mui/material/colors'
import InputLabel from '@mui/material/InputLabel'
import { FormControl } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IBrand, IModel, IYear } from '../src/types'
import { useRouter } from 'next/router'
import { FipeService } from '../src/services/FipeService'
import { useForm } from '../src/hooks/useForm'
import Head from 'next/head'

interface BuscaProps {
  brands: IBrand[] | null
}

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: red[50],
  padding: 48,
  [theme.breakpoints.down('md')]: {
    padding: 24
  }
}))

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
      const { brand, model, year } = values

      router.push(`/resultado?brand=${brand}&model=${model}&year=${year}`)
    }
  })

  const handleBrandChange = async (event: SelectChangeEvent<string>) => {
    currentForm.handleChange(event)

    if (event.target.value) {
      const newModels: IModel[] | null = await FipeService.getAllModelsByBrand(event.target.value)

      if (newModels?.length) {
        setModels(newModels)
      }
    }
  }

  const handleModelChange = async (event: SelectChangeEvent<string>) => {
    currentForm.handleChange(event)

    if (event.target.value) {
      const newYears: IModel[] | null = await FipeService.getAllYearsByBrandAndModel(
        currentForm.values.brand,
        event.target.value
      )

      if (newYears?.length) {
        setYears(newYears)
      }
    }
  }

  return (
    <>
      <Head>
        <title>Mobiauto Challenge</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="your fb id" /> */}
        <meta property="og:title" content={`Mobiauto Challenge Busca`} />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta
          property="og:description"
          content={`Consulte agora carros e seus preços na tabela Fipe`}
        />
        {/* <meta property="og:image" content={url} /> */}
      </Head>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <StyledContainer>
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
                disabled={!currentForm.values.brand}
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
                  disabled={!currentForm.values.model}
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
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={!currentForm.values.brand || !currentForm.values.model || !currentForm.values.year}
              >
                Consultar preço
              </Button>
            </Box>
          </StyledForm>
        </StyledContainer>
      </Box>
    </>
  )
}

export async function getStaticProps(context: any) {
  const brands = await FipeService.getAllBrands() ?? []

  return {
    props: {
      brands
    }
  }
}
