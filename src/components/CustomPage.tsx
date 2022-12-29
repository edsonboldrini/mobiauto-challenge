import { styled } from '@mui/material/styles'

interface CustomPageProps {
  children: React.ReactNode
}

export default function CustomPage({ children }: CustomPageProps) {
  const CustomPageDiv = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 48,
    [theme.breakpoints.down('md')]: {
      padding: 24
    }
  }))

  return (
    <CustomPageDiv>
      {children}
    </CustomPageDiv>
  )
}