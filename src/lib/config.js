export const config = {
  pdfGeneratorUrl: import.meta.env.VITE_PDF_GENERATOR_URL || 'http://localhost:5000',
  adminEmails: [
    'alexandro@liberatori.com.br',
    'admin@liberatori.com.br'
  ]
}

export const isAdmin = (email) => {
  return config.adminEmails.includes(email?.toLowerCase())
}
