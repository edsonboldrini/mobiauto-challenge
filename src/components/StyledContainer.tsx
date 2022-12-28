import { styled } from '@mui/material/styles'

interface StyledContainerProps {
  children: React.ReactNode
  backgroundColor: string
}

export default function StyledContainer({ children, backgroundColor }: StyledContainerProps) {
  const StyledContainerDiv = styled('div')(({ theme }) => ({
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
    <StyledContainerDiv>
      {children}
    </StyledContainerDiv>
  )
}