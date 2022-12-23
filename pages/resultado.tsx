import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { IVehicleData } from '../src/types'

interface ResultadoProps {
  vehicleData: IVehicleData | null
}

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#dff3f2',
  padding: 48,
  [theme.breakpoints.down('md')]: {
    padding: 24
  }
}))

export default function Resultado({ vehicleData }: ResultadoProps) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <StyledContainer>
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 2, fontWeight: 'bold', color: '#454357', textAlign: 'center' }}
        >
          Tabela Fipe: Preço {vehicleData?.Modelo}
        </Typography>
        <Box
          sx={{
            backgroundColor: '#43a48d',
            padding: 2,
            borderRadius: 10,
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            mb: 2
          }}
        >
          {vehicleData?.Valor}
        </Box>
        <Typography sx={{ color: '#87859a' }}>Este é o preço de compra do veículo</Typography>
      </StyledContainer>
    </Box>
  )
}

async function fetchPrice(brand: string, model: string, year: string): Promise<IVehicleData | null> {
  try {
    const response = await fetch(
      `https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${year}`
    )
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getServerSideProps(context: any) {
  const { brand, model, year } = context.query

  if (!brand || !model || !year) {
    console.log('Redirect please!!')
    return {
      redirect: {
        permanent: false,
        destination: '/busca'
      }
    }
  }

  const price = await fetchPrice(brand, model, year)

  return {
    props: {
      price
    }
  }
}
