import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ICarData } from '../src/types';

interface BuscaProps {
  price: ICarData | null
}

export default function Busca({ price }: BuscaProps) {  
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
          backgroundColor: "#dff3f2",
          padding: 6
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#454357' }}>
          Tabela Fipe: Preço {price?.Modelo}
        </Typography>
        <Box
          sx={{
            backgroundColor: "#43a48d",
            padding: 2,
            borderRadius: 10,
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            mb: 2            
          }}
        >
          {price?.Valor}
        </Box>
        <Typography sx={{ color: '#87859a' }} >
          Este é o preço de compra do veículo
        </Typography>
      </Box >
    </Box>
  );
}

async function fetchPrice(brand: string, model:string, year: string): Promise<ICarData | null> {
  try {
    const response = await fetch(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${brand}/modelos/${model}/anos/${year}`)
    const data = await response.json()

    return data
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getServerSideProps(context: any) {
  const {brand, model, year} = context.query

  if (!brand || !model || !year) {
    console.log('Redirect please!!')
    return {
      redirect: {
        permanent: false,
        destination: "/busca",
      },
    }
  }

  const price = await fetchPrice(brand, model, year)

  return {
    props: {
      price,
    }
  }
}