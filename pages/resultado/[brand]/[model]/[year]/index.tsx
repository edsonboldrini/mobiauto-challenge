import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { IVehicleData } from '../../../../../src/types'
import { FipeService } from '../../../../../src/services/FipeService'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import Link from 'next/link'
import theme from '../../../../../src/config/theme'

interface ResultadoProps {
  vehicleData: IVehicleData | null
}

const StyledContainer = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.success.light,
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
          <Link href='/busca' style={{ textDecoration: 'none' }} passHref>
            <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[200], color: 'white', mb: 2 }}>
              Voltar para busca
            </Button>
          </Link>
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.grey[500], textAlign: 'center' }}
          >
            Tabela Fipe Preço: {vehicleData?.Marca} {vehicleData?.Modelo} {vehicleData?.AnoModelo} {vehicleData?.Combustivel}
          </Typography>
          <Box
            sx={{
              backgroundColor: theme.palette.success.main,
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
          <Typography sx={{ color: theme.palette.grey[200] }}>Este é o preço de compra do veículo</Typography>
          <p style={{ marginTop: '16px', color: theme.palette.grey[200] }}>Código fonte disponível em: <a href='https://github.com/edsonboldrini/mobiauto-challenge' style={{ marginTop: '16px', color: theme.palette.grey[200] }}>https://github.com/edsonboldrini/mobiauto-challenge</a></p>
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