import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const uploadFile = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('missions')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) throw error
  return data
}

export const downloadFile = async (path) => {
  const { data, error } = await supabase.storage
    .from('missions')
    .download(path)
  
  if (error) throw error
  return data
}

export const getPublicUrl = (path) => {
  const { data } = supabase.storage
    .from('missions')
    .getPublicUrl(path)
  
  return data.publicUrl
}
