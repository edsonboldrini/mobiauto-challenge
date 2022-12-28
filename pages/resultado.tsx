import Typography from '@mui/material/Typography'
import { IVehicleData } from '../src/types'
import { FipeService } from '../src/services/FipeService'
import theme from '../src/config/theme'
import DefaultLayout from '../src/layouts/DefaultLayout'
import CustomPill from '../src/components/CustomPill'
import StyledContainer from '../src/components/CustomPage'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'

interface ResultadoProps {
  vehicleData: IVehicleData | null
}

export default function Resultado({ vehicleData }: ResultadoProps) {
  const router = useRouter()

  return (
    <DefaultLayout title={vehicleData?.Modelo} metaTitle={`${vehicleData?.Modelo} - ${vehicleData?.Valor}`} metaDescription={`${vehicleData?.Marca} ${vehicleData?.Modelo} ${vehicleData?.AnoModelo} ${vehicleData?.Combustivel}`} >
      <StyledContainer backgroundColor={theme.palette.success.light}>
        <Button
          variant="contained"
          sx={{ backgroundColor: theme.palette.grey[200], color: 'white', mb: 2 }}
          onClick={() => router.back()}
        >
          Voltar para busca
        </Button>
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 2, fontWeight: 'bold', color: theme.palette.grey[500], textAlign: 'center' }}
        >
          Tabela Fipe Preço: {vehicleData?.Marca} {vehicleData?.Modelo} {vehicleData?.AnoModelo} {vehicleData?.Combustivel}
        </Typography>
        <CustomPill
          backgroundColor={theme.palette.success.main}
          textColor='white'
          content={`${vehicleData?.Valor}`}
        />
        <Typography sx={{ color: theme.palette.grey[200] }}>Este é o preço de compra do veículo</Typography>
        <Typography sx={{ color: theme.palette.grey[200], textAlign: 'center', mt: 2 }}>Código fonte disponível em: <a href='https://github.com/edsonboldrini/mobiauto-challenge' style={{ color: theme.palette.grey[200] }}>https://github.com/edsonboldrini/mobiauto-challenge</a></Typography>
      </StyledContainer>
    </DefaultLayout>

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