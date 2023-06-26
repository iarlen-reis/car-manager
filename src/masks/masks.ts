export const normalizePhoneNumber = (value: string | undefined) => {
  if (!value) return ''

  return value
    .replace(/[\D]/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})(\d+?)/, '$1')
}

export const removeSpecialCharacters = (value) => {
  if (!value) return ''

  return value.replace(/[\/\.\-]/g, '')
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
  const plateRegex = /^[A-Z]{3}[-]?[0-9]{4}$/

  if (!value || !plateRegex.test(value)) {
    return ''
  }

  return value
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/(\w{3})(\d{4})/, '$1-$2')
}

export const normalizeCnhNumber = (value: string | undefined) => {
  const cnhRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/

  if (!value) return ''

  const match = value.replace(/\D/g, '').match(cnhRegex)
  if (!match) return ''

  return match[1] + '.' + match[2] + '.' + match[3] + '-' + match[4]
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
