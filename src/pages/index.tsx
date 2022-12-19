import Link from "next/link"

function HomePage() {
  return <div>
    <Link href={'/busca'} >
      <button>Buscar</button>
    </Link>
    <Link href={'/resultado'} >
      <button>Resultado</button>
    </Link>
  </div>
}

export default HomePage