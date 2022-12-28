import Box from "@mui/material/Box"

interface CustomPillProps {
  backgroundColor: string
  textColor: string
  content: string
}

export default function CustomPill({ backgroundColor, textColor, content }: CustomPillProps) {
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        padding: 2,
        borderRadius: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: textColor,
        mb: 2
      }}
    >
      {content}
    </Box>
  )
}