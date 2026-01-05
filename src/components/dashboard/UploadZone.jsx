import { useState, useCallback } from 'react'
import { Upload, FileCheck, AlertCircle, Loader2, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { uploadFile } from '../../lib/supabase'

export function UploadZone({ phase, userId, onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    setError('')
    setSuccess(false)

    const droppedFile = e.dataTransfer.files[0]
    validateAndSetFile(droppedFile)
  }, [])

  const handleFileSelect = (e) => {
    setError('')
    setSuccess(false)
    const selectedFile = e.target.files[0]
    validateAndSetFile(selectedFile)
  }

  const validateAndSetFile = (file) => {
    if (!file) return

    if (file.type !== 'application/pdf') {
      setError('Apenas arquivos PDF são aceitos')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('O arquivo deve ter no máximo 10MB')
      return
    }

    setFile(file)
  }

  const handleUpload = async () => {
    if (!file || !phase || !userId) return

    setUploading(true)
    setError('')

    try {
      const fileName = `${userId}/fase_${phase.id}/${Date.now()}_${file.name}`
      await uploadFile(file, fileName)
      setSuccess(true)
      setFile(null)
      onUploadSuccess?.()
    } catch (err) {
      setError(err.message || 'Erro ao enviar arquivo')
    } finally {
      setUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setError('')
    setSuccess(false)
  }

  if (!phase) {
    return (
      <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
        <Upload className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-slate-400 mb-2">
          Área de Entrega
        </h3>
        <p className="text-slate-500 text-sm">
          Selecione uma fase para enviar seu material
        </p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Upload className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Entrega</span>
            <h3 className="font-serif text-lg text-amber-500">
              Enviar Missão - {phase.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <FileCheck className="w-8 h-8 text-green-500" />
            </div>
            <h4 className="text-lg text-green-400 font-medium mb-2">
              Enviado com Sucesso!
            </h4>
            <p className="text-slate-400 text-sm mb-4">
              Seu material foi recebido e está em análise
            </p>
            <button
              onClick={clearFile}
              className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
            >
              Enviar outro arquivo
            </button>
          </div>
        ) : (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8",
                "transition-all duration-300 cursor-pointer",
                isDragging
                  ? "border-amber-500 bg-amber-500/5"
                  : "border-slate-700 hover:border-slate-600",
                file && "border-amber-500/50 bg-amber-500/5"
              )}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <FileCheck className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-slate-200 font-medium">{file.name}</p>
                      <p className="text-slate-500 text-sm">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      clearFile()
                    }}
                    className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className={cn(
                    "w-10 h-10 mx-auto mb-3 transition-colors",
                    isDragging ? "text-amber-500" : "text-slate-500"
                  )} />
                  <p className="text-slate-300 mb-1">
                    Arraste seu PDF aqui ou clique para selecionar
                  </p>
                  <p className="text-slate-500 text-sm">
                    Máximo 10MB • Apenas PDF
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {file && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={cn(
                  "w-full mt-4 py-3 rounded-xl font-medium",
                  "bg-gradient-to-r from-amber-600 to-amber-500",
                  "text-slate-950 shadow-gold",
                  "hover:from-amber-500 hover:to-amber-400",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "transition-all duration-300",
                  "flex items-center justify-center gap-2"
                )}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Enviar Missão</span>
                  </>
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
