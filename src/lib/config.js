export const config = {
  pdfGeneratorUrl: import.meta.env.VITE_PDF_GENERATOR_URL || 'https://gerador-pdf-liberatori.onrender.com',
  adminEmails: [
    'alexandro@liberatori.com.br',
    'admin@liberatori.com.br'
  ]
}

export const isAdmin = (email) => {
  return config.adminEmails.includes(email?.toLowerCase())
}
