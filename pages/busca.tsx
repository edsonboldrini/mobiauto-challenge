import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useState } from 'react'
import { red } from '@mui/material/colors'
import { CircularProgress } from '@mui/material'
import { styled } from '@mui/material/styles'
import { IBrand, IModel, IYear } from '../src/types'
import { useRouter } from 'next/router'
import { FipeService } from '../src/services/FipeService'
import { ChangeEvents, useForm } from '../src/hooks/useForm'
import theme from '../src/configs/theme'
import DefaultLayout from '../src/layouts/DefaultLayout'
import StyledContainer from '../src/components/CustomPage'
import CustomSelect from '../src/components/CustomSelect'
import { SearchContext } from '../src/contexts/SearchProvider'

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

export default function Busca({ brands }: BuscaProps) {
  const searchContext = useContext(SearchContext)
  const router = useRouter()
  const [models, setModels] = useState<IModel[] | null>(null)
  const [years, setYears] = useState<IYear[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const currentForm = useForm({
    initialValues: {
      brand: searchContext.values.brand,
      model: searchContext.values.model,
      year: searchContext.values.year
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

  const handleBrandChange = async (event: ChangeEvents) => {
    currentForm.handleChange(event)
    currentForm.updateKeyValue('model', '')
    currentForm.updateKeyValue('year', '')

    if (event.target.value) {
      await updateModelsByBrand(event.target.value.toString())
    }
  }

  async function updateModelsByBrand(brand: string) {
    setIsLoading(true)
    const newModels: IModel[] | null = await FipeService.getAllModelsByBrand(brand)

    if (newModels?.length) {
      setModels(newModels)
    }
    setIsLoading(false)
  }

  const handleModelChange = async (event: ChangeEvents) => {
    currentForm.handleChange(event)
    currentForm.updateKeyValue('year', '')

    if (event.target.value) {
      await updateYearsByBrandAndModel(currentForm.values.brand, event.target.value.toString())
    }
  }

  async function updateYearsByBrandAndModel(brand: string, model: string) {
    setIsLoading(true)
    const newYears: IModel[] | null = await FipeService.getAllYearsByBrandAndModel(brand, model)

    if (newYears?.length) {
      setYears(newYears)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (searchContext.values.brand) {
      updateModelsByBrand(searchContext.values.brand)
    }
    if (searchContext.values.brand && searchContext.values.model) {
      updateYearsByBrandAndModel(searchContext.values.brand, searchContext.values.model)
    }
  }, [])

  return (
    <DefaultLayout
      metaTitle="Mobiauto Challenge - Busca"
      backgroundColor={red[50]}
    >
      <StyledContainer>
        <Typography component="h1" variant="h4" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Tabela Fipe
        </Typography>
        <Typography component="h2" variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Consulte o valor de um veículo de forma gratuita
        </Typography>
        <StyledForm onSubmit={currentForm.handleSubmit} noValidate>
          <CustomSelect
            name='brand'
            label='Marca'
            required
            value={currentForm.values.brand}
            onChange={handleBrandChange}
            errorMessage={currentForm.errors.brand}
            options={brands?.map((element) => { return { key: element.codigo, value: element.nome } }) ?? []}
          />
          <CustomSelect
            name='model'
            label='Modelo'
            required
            disabled={isLoading || !currentForm.values.brand}
            value={models?.length ? currentForm.values.model : ''}
            onChange={handleModelChange}
            errorMessage={currentForm.errors.model}
            options={models?.map((element) => { return { key: element.codigo, value: element.nome } }) ?? []}
          />
          {!currentForm.values.model ? (
            <></>
          ) : (
            <CustomSelect
              name='year'
              label='Ano'
              required
              disabled={isLoading || !currentForm.values.model}
              value={years?.length ? currentForm.values.year : ''}
              onChange={currentForm.handleChange}
              errorMessage={currentForm.errors.year}
              options={years?.map((element) => { return { key: element.codigo, value: element.nome } }) ?? []}
            />
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
