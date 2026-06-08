const escapeHTML = (unsaveString) => {
  return unsaveString
    .replaceAll(/&/g, '&amp;')
    .replaceAll(/</g, '&lt;')
    .replaceAll(/>/g, '&gt;')
    .replaceAll(/"/g, '&quot;')
    .replaceAll(/'/g, '&#39;')
}

const escapeRegExp = (unsaveString) => {
  return unsaveString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const highlightCaseInsensitive = (text, query) => {
  const safeText = escapeHTML(text)
  const queryFormatted = query.trim()

  if (queryFormatted.length === 0) {
    return safeText
  }

  const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig')

  return safeText.replace(pattern, `<mark>$&</mark>`)
}