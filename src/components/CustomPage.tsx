import { styled } from '@mui/material/styles'

interface CustomPageProps {
  children: React.ReactNode
  backgroundColor: string
}

export default function CustomPage({ children, backgroundColor }: CustomPageProps) {
  const CustomPageDiv = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: backgroundColor,
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