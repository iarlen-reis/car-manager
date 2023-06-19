export const formateDate = (data: string) => {
  const formated = new Date(data)

  return formated.toLocaleDateString()
}

export const backToStringDate = (data: string) => {
  const datad = new Date(data).toLocaleDateString()
  const partes = datad.split('/')
  const dia = partes[0]
  const mes = partes[1]
  const ano = partes[2]

  const dataFormatada = `${ano}-${mes}-${dia}`

  return dataFormatada
}

export const modifyDate = (date: string) => {
  const parts = date.split('/')
  const day = parts[0]
  const month = parts[1]
  const year = parts[2]

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}
