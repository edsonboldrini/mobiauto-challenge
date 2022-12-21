import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { red } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import { FormControl } from '@mui/material';

interface Marca {
  nome: string
  codigo: string
}
interface Modelo {
  nome: string
  codigo: string
}

interface BuscaProps {
  companies: Marca[] | null
}

export default function Busca({ companies }: BuscaProps) {
  const [currentCompany, setCurrentCompany] = useState<string>('')
  const [currentModel, setCurrentModel] = useState<string>('')
  const [models, setModels] = useState<Modelo[] | null>(null)

  const handleCompanyChange = async (event: SelectChangeEvent<string>) => {
    setCurrentCompany(event.target.value)
    setCurrentModel('')

    if (event.target.value) {
      const newModels: Modelo[] | null = await fetchModels(event.target.value)

      if (newModels?.length) {
        setModels(newModels)
      }
    }
  }

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    setCurrentModel(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
        <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
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
            sx={{ marginBottom: 2 }}
          >
            <InputLabel id="companies-select">Marca</InputLabel>
            <Select
              labelId="companies-select"
              id="companies-select"
              value={currentCompany}
              label="Marca"
              onChange={handleCompanyChange}
              margin="none"
              required
              fullWidth
            >
              {companies?.map((element) =>
                <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <InputLabel id="model-select">Modelo</InputLabel>
            <Select
              labelId="model-select"
              id="model-select"
              value={currentModel}
              label="Modelo"
              onChange={handleModelChange}
              margin="none"
              required
              fullWidth
              disabled={!currentCompany}
            >
              {models?.map((element) =>
                <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
              )}
            </Select>
          </FormControl>
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
              sx={{ mt: 3 }}
            >
              Consultar preço
            </Button>
          </Box>
        </Box>
      </Box >
    </Box>
  );
}

async function fetchCompanies(): Promise<Marca[] | null> {
  try {
    const response = await fetch('https://parallelum.com.br/fipe/api/v1/carros/marcas')
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

async function fetchModels(currentCompany: string): Promise<Modelo[] | null> {
  try {
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${currentCompany}/modelos`)
    const data = await response.json()

    return data.modelos
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getServerSideProps() {
  const companies = await fetchCompanies()

  return {
    props: {
      companies,
    }
  }
}