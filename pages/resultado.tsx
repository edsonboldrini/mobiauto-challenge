import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { IVehicleData } from '../src/types'
import { FipeService } from '../src/services/FipeService'

const fipeService = FipeService()

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

  const vehicleData = await fipeService.getVehicleData(brand, model, year)

  return {
    props: {
      vehicleData
    }
  }
}
