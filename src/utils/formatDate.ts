// transforme date on pattern DD/MM/YYYY
export const formateDate = (data: string) => {
  const formated = new Date(data)

  return formated.toLocaleDateString()
}

// tranforme date on pattern YYYY-MM-DD
export const backToStringDate = (data: string) => {
  const datad = new Date(data).toLocaleDateString()
  const partes = datad.split('/')
  const dia = partes[0]
  const mes = partes[1]
  const ano = partes[2]

  const dataFormatada = `${ano}-${mes}-${dia}`

  return dataFormatada
}

// tranforme date on DD-MM-YYYY to pattern YYYY-MM-DD
export const modifyDate = (date: string) => {
  const dateformated = formateDate(date)

  const parts = dateformated.split('/')
  const day = parts[0]
  const month = parts[1]
  const year = parts[2]

  const formattedDate = `${year}-${month}-${day}`

  return formattedDate
}

// return the dateActual
export const dateActual = () => {
  const date = new Date().toLocaleDateString()

  return date
}

export const DateParse = (date: string) => {
  const dataParse = new Date(date)

  return dataParse
}

export const isAfterDate = (date: string) => {
  const partesData = date.split('/')
  const dataFormated = new Date(
    Number(partesData[2]),
    Number(partesData[1]) - 1,
    Number(partesData[0]),
  )

  if (dataFormated >= new Date()) {
    return true
  } else {
    return false
  }
}
