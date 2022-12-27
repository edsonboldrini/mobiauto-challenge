import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { IVehicleData } from '../src/types'
import { FipeService } from '../src/services/FipeService'
import Head from 'next/head'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{vehicleData?.Modelo}</title>
        <meta property="og:url" content={router.asPath} />
        <meta property="og:type" content="website" />
        {/* <meta property="fb:app_id" content="your fb id" /> */}
        <meta property="og:title" content={`${vehicleData?.Modelo} - ${vehicleData?.Valor}`} />
        {/* <meta name="twitter:card" content="summary" /> */}
        <meta
          property="og:description"
          content={`${vehicleData?.Marca} ${vehicleData?.Modelo} ${vehicleData?.AnoModelo} ${vehicleData?.Combustivel}`}
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
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 2, fontWeight: 'bold', color: '#454357', textAlign: 'center' }}
          >
            Tabela Fipe Preço: {vehicleData?.Marca} {vehicleData?.Modelo} {vehicleData?.AnoModelo} {vehicleData?.Combustivel}
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
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { brand, model, year } = context.query

  if (!brand || !model || !year) {
    return {
      redirect: {
        permanent: false,
        destination: '/busca'
      }
    }
  }

  const vehicleData = await FipeService.getVehicleData(brand, model, year)

  if (!vehicleData) {
    return {
      redirect: {
        permanent: false,
        destination: '/busca'
      }
    }
  }

  return {
    props: {
      vehicleData
    }
  }
}