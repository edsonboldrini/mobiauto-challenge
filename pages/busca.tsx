import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';
import { IMarca, IModelo, IYear } from '../src/types';
import { useRouter } from 'next/router';

interface BuscaProps {
  brands: IMarca[] | null
}

export default function Busca({ brands }: BuscaProps) {
  const router = useRouter()
  const [currentBrand, setCurrentBrand] = useState<string>('')
  const [currentModel, setCurrentModel] = useState<string>('')
  const [currentYear, setCurrentYear] = useState<string>('')
  const [models, setModels] = useState<IModelo[] | null>(null)
  const [years, setYears] = useState<IYear[] | null>(null)

  const handleBrandChange = async (event: SelectChangeEvent<string>) => {
    setCurrentBrand(event.target.value)
    setCurrentModel('')

    if (event.target.value) {
      const newModels: IModelo[] | null = await fetchModels(event.target.value)

      if (newModels?.length) {
        setModels(newModels)
      }
    }
  }

  const handleModelChange = async (event: SelectChangeEvent<string>) => {
    setCurrentModel(event.target.value)
    setCurrentYear('')

    if (event.target.value) {
      const newYears: IModelo[] | null = await fetchYears(currentBrand, event.target.value)

      if (newYears?.length) {
        setYears(newYears)
      }
    }
  }

  const handleYearChange = async (event: SelectChangeEvent<string>) => {
    setCurrentYear(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    router.push(`/resultado?brand=${data.get('brand')}&model=${data.get('model')}&year=${data.get('year')}`)
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 1,
          backgroundColor: red[50],
          padding: 6
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Tabela Fipe
        </Typography>
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          Consulte o valor de um veículo de forma gratuita
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: 1 / 2,
            backgroundColor: 'white',
            padding: 6
          }}
        >
          <FormControl
            fullWidth
            sx={{ marginBottom: 3 }}
          >
            <InputLabel id="brands-select">Marca</InputLabel>
            <Select
              labelId="brands-select"
              id="brand"
              name="brand"
              value={currentBrand}
              label="Marca"
              onChange={handleBrandChange}
              margin="none"
              required
              fullWidth
            >
              {brands?.map((element) =>
                <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 3 }}
          >
            <InputLabel id="models-select">Modelo</InputLabel>
            <Select
              labelId="models-select"
              id="model"
              name="model"
              value={currentModel}
              label="Modelo"
              onChange={handleModelChange}
              margin="none"
              required
              fullWidth
              disabled={!currentBrand}
            >
              {models?.map((element) =>
                <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
              )}
            </Select>
          </FormControl>
          {!currentModel ?
            <></> :
            <FormControl
              fullWidth
              sx={{ marginBottom: 3 }}
            >
              <InputLabel id="years-select">Ano</InputLabel>
              <Select
                labelId="years-select"
                id="year"
                name="year"
                value={currentYear}
                label="Ano"
                onChange={handleYearChange}
                margin="none"
                required
                fullWidth
                disabled={!currentModel}
              >
                {years?.map((element) =>
                  <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
                )}
              </Select>
            </FormControl>
          }
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
              disabled={!currentBrand || !currentModel || !currentYear}
            >
              Consultar preço
            </Button>
          </Box>
        </Box>
      </Box >
    </Box>
  );
}

async function fetchBrands(): Promise<IMarca[] | null> {
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

async function fetchModels(brand: string): Promise<IModelo[] | null> {
  try {
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos`)
    const data = await response.json()

    return data.modelos
  } catch (e) {
    console.log(e)
    return null
  }
}

async function fetchYears(brand: string, model: string): Promise<IYear[] | null> {
  try {
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos`)
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getServerSideProps(context: any) {
  const brands = await fetchBrands()

  return {
    props: {
      brands,
    }
  }
}