import Box from "@mui/material/Box"
import Head from "next/head"
import { useRouter } from "next/router"

interface DefaultLayoutProps {
  children: React.ReactNode
  title?: string
  metaTitle?: string
  metaDescription?: string
}

export default function DefaultLayout({ children, title = 'Mobiauto Challenge', metaTitle = 'Mobiauto Challenge', metaDescription = 'Consulte agora carros e seus preços na tabela Fipe' }: DefaultLayoutProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:url" content={router?.asPath ?? 'https://mobiauto-challenge.vercel.app'} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo-white.png" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
      </Head>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {children}
      </Box>
    </>
  )
}
