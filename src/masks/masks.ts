export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

export const removeSpecialCharacters = (value: string | undefined) => {
  if (!value) return ''

  return value.replace(/[\\/\\.\\-]/g, '')
}

export const normalizeCnpjNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1')
}

export const normalizeCpfNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const normalizeLicensePlate = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[^\w]/g, '')
    .replace(/(\w{3})(\w)/, '$1-$2')
    .toUpperCase()
}

export const normalizeCnhNumber = (value: string | undefined) => {
  const maxLength = 11

  if (!value) return ''

  const digitsOnly = value.replace(/\D/g, '')
  const formattedCnh = []

  for (let i = 0; i < digitsOnly.length && i < maxLength; i++) {
    formattedCnh.push(digitsOnly[i])

    if (i === 2 || i === 5) {
      formattedCnh.push('.')
    } else if (i === 8) {
      formattedCnh.push('-')
    }
  }

  return formattedCnh.join('')
}

export const normalizeRgNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const normalizeCepNumber = (value: string | undefined) => {
  if (!value) return ''
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1')
}
