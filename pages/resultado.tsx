import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { Button, useTheme } from '@mui/material'
import { IVehicleData } from '../src/types'
import { FipeService } from '../src/services/FipeService'
import DefaultLayout from '../src/layouts/DefaultLayout'
import CustomPill from '../src/components/CustomPill'
import StyledContainer from '../src/components/CustomPage'
import { ThemeSwitch } from '../src/components/ThemeSwitch'
import { SearchRoute } from '../src/utils/routesPaths'

interface ResultadoProps {
  vehicleData: IVehicleData | null
}

export default function Resultado({ vehicleData }: ResultadoProps) {
  const theme = useTheme()

  return (
    <DefaultLayout
      title={vehicleData?.Modelo}
      metaTitle={`${vehicleData?.Modelo} - ${vehicleData?.Valor}`}
      metaDescription={`${vehicleData?.Marca} ${vehicleData?.Modelo} ${vehicleData?.AnoModelo} ${vehicleData?.Combustivel}`}
      backgroundColor={theme.palette.customBackground.green}
    >
      <StyledContainer>
        <ThemeSwitch />
        <Button
          variant="contained"
          sx={{ color: 'white', mb: 2 }}
          href={SearchRoute}
        >
          Voltar para busca
        </Button>
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
        >
          Tabela Fipe Preço: {vehicleData?.Marca} {vehicleData?.Modelo} {vehicleData?.AnoModelo} {vehicleData?.Combustivel}
        </Typography>
        <CustomPill
          backgroundColor={theme.palette.success.main}
          textColor='white'
          content={`${vehicleData?.Valor}`}
        />
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }} >Este é o preço de compra do veículo</Typography>
        <Typography variant="body1" sx={{ color: theme.palette.text.secondary, textAlign: 'center', mt: 2 }}>Código fonte disponível em: <a href='https://github.com/edsonboldrini/mobiauto-challenge' style={{ color: theme.palette.text.secondary }}>https://github.com/edsonboldrini/mobiauto-challenge</a></Typography>
      </StyledContainer>
    </DefaultLayout>

  )
}

export async function getServerSideProps(context: any) {
  const { brand, model, year } = context.params

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