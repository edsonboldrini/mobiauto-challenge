import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

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
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h3">
        Tabela Fipe
      </Typography>
      <Typography component="h3" variant="h6">
        Consulte o valor de um veículo de forma gratuita
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Select
          labelId="companies-select"
          id="companies-select"
          value={currentCompany}
          label="Marca"
          onChange={handleCompanyChange}
          margin="none"
          required
          fullWidth
          placeholder='Marca'
        >
          {companies?.map((element) =>
            <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
          )}
        </Select>
        <Select
          labelId="companies-select"
          id="companies-select"
          value={currentModel}
          label="Age"
          onChange={handleModelChange}
          margin="none"
          required
          fullWidth
        >
          {models?.map((element) =>
            <MenuItem value={element.codigo} key={element.codigo}>{element.nome}</MenuItem>
          )}
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Consultar preço
        </Button>
      </Box>
    </Box >
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