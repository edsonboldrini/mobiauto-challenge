const charactersArray: string[] = ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Beth Smith', 'Jerry Smith']
const keyMapping: { [key: string]: string } = {
  'nome': 'name',
  'genero': 'gender',
  'avatar': 'image',
  'especie': 'species',
}
const translateMapping: { [key: string]: string } = {
  'Human': 'Humano',
  'Male': 'Homem',
  'Female': 'Mulher'
}

export async function getRickAndMortyCharacters() {
  const response = await fetch('https://rickandmortyapi.com/api/character')
  const data = await response.json()
  const finalArray: { [key: string]: any }[] = []

  data.results.forEach((element: { [key: string]: any }) => {
    if (charactersArray.includes(element.name)) {
      const obj: { [key: string]: any } = {}
      for (const [key, value] of Object.entries(keyMapping)) {
        obj[key] = element[value] in translateMapping ? translateMapping[element[value]] : element[value]
      }
      finalArray.push(obj);
    }
  });

  return finalArray
}