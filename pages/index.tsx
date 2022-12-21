import Button from "@mui/material/Button"
import Link from "next/link"

function HomePage() {
  return <div>
    <Link href={'/busca'} >
      <Button variant="contained">Buscar</Button>
    </Link>
    <Link href={'/resultado'} >
      <Button variant="contained">Resultado</Button>
    </Link>
  </div>
}

export default HomePage