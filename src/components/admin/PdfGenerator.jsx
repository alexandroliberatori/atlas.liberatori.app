import { useState, useEffect, useRef } from 'react'
import { 
  FileText, 
  Download, 
  Loader2, 
  AlertCircle, 
  CheckCircle, 
  Trash2, 
  FileCode,
  Play,
  Copy,
  Check
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { config } from '../../lib/config'

const EXEMPLO_LATEX = `\\documentclass{article}

\\title{Exemplo de Teste}
\\author{Sociedade Liberatori}

\\begin{document}
\\maketitle

\\section{Introducao}
Ola mundo! Este e um teste do Gerador de PDF.

\\section{Conteudo}
Este e um documento simples sem pacotes especiais.

\\subsection{Lista de itens}
\\begin{itemize}
  \\item Primeiro item
  \\item Segundo item
  \\item Terceiro item
\\end{itemize}

\\section{Conclusao}
Documento gerado com sucesso.

\\end{document}`

export function PdfGenerator() {
  const [codigo, setCodigo] = useState('')
  const [loading, setLoading] = useState(false)
  const [latexDisponivel, setLatexDisponivel] = useState(null)
  const [verificando, setVerificando] = useState(true)
  const [resultado, setResultado] = useState(null)
  const [erro, setErro] = useState('')
  const [pdfId, setPdfId] = useState(null)
  const [copiado, setCopiado] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    verificarLatex()
  }, [])

  const verificarLatex = async () => {
    setVerificando(true)
    try {
      const response = await fetch(`${config.pdfGeneratorUrl}/verificar-latex`)
      const data = await response.json()
      setLatexDisponivel(data.disponivel)
    } catch (error) {
      console.error('Erro ao verificar LaTeX:', error)
      setLatexDisponivel(false)
      setErro('Não foi possível conectar ao servidor de geração de PDF')
    } finally {
      setVerificando(false)
    }
  }

  const gerarPdf = async () => {
    if (!codigo.trim()) {
      setErro('Por favor, insira o código LaTeX antes de gerar o PDF.')
      return
    }

    setLoading(true)
    setErro('')
    setResultado(null)
    setPdfId(null)

    try {
      const response = await fetch(`${config.pdfGeneratorUrl}/gerar-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ codigo }),
      })

      const data = await response.json()

      if (data.sucesso) {
        setPdfId(data.pdf_id)
        setResultado('success')
      } else {
        setErro(data.erro || 'Erro desconhecido ao gerar PDF.')
        setResultado('error')
      }
    } catch (error) {
      setErro(`Erro de conexão: ${error.message}`)
      setResultado('error')
    } finally {
      setLoading(false)
    }
  }

  const downloadPdf = () => {
    if (pdfId) {
      window.open(`${config.pdfGeneratorUrl}/download/${pdfId}`, '_blank')
    }
  }

  const carregarExemplo = () => {
    setCodigo(EXEMPLO_LATEX)
    setErro('')
    setResultado(null)
  }

  const limparEditor = () => {
    setCodigo('')
    setErro('')
    setResultado(null)
    setPdfId(null)
  }

  const copiarCodigo = async () => {
    try {
      await navigator.clipboard.writeText(codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = codigo.substring(0, start) + '  ' + codigo.substring(end)
      setCodigo(newValue)
      setTimeout(() => {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-amber-500 mb-1">
            Gerador de PDF
          </h2>
          <p className="text-slate-400 text-sm">
            Compile código LaTeX e gere PDFs profissionais
          </p>
        </div>

        <div className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm",
          "border transition-all duration-300",
          verificando && "bg-slate-900/50 border-slate-700 text-slate-400",
          !verificando && latexDisponivel && "bg-green-500/10 border-green-500/30 text-green-400",
          !verificando && !latexDisponivel && "bg-red-500/10 border-red-500/30 text-red-400"
        )}>
          {verificando ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verificando...</span>
            </>
          ) : latexDisponivel ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>LaTeX Disponível</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4" />
              <span>LaTeX Indisponível</span>
            </>
          )}
        </div>
      </div>

      <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-2 text-slate-400">
            <FileCode className="w-4 h-4" />
            <span className="text-sm font-medium">Editor LaTeX</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={carregarExemplo}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
                "bg-slate-800/50 border border-slate-700",
                "text-slate-300 hover:text-amber-500 hover:border-amber-500/30",
                "transition-all duration-300"
              )}
            >
              <FileText className="w-4 h-4" />
              Exemplo
            </button>
            
            <button
              onClick={copiarCodigo}
              disabled={!codigo}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
                "bg-slate-800/50 border border-slate-700",
                "text-slate-300 hover:text-amber-500 hover:border-amber-500/30",
                "transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar
                </>
              )}
            </button>
            
            <button
              onClick={limparEditor}
              disabled={!codigo}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm",
                "bg-slate-800/50 border border-slate-700",
                "text-slate-300 hover:text-red-400 hover:border-red-500/30",
                "transition-all duration-300",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <Trash2 className="w-4 h-4" />
              Limpar
            </button>
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Cole ou digite seu código LaTeX aqui..."
          className={cn(
            "w-full h-96 p-4 resize-none",
            "bg-slate-950/50 text-slate-200",
            "font-mono text-sm leading-relaxed",
            "placeholder:text-slate-600",
            "focus:outline-none",
            "border-none"
          )}
          spellCheck={false}
        />

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-800 bg-slate-900/50">
          <span className="text-xs text-slate-500">
            {codigo.length} caracteres • {codigo.split('\n').length} linhas
          </span>
          
          <button
            onClick={gerarPdf}
            disabled={loading || !latexDisponivel || !codigo.trim()}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium",
              "bg-gradient-to-r from-amber-600 to-amber-500",
              "text-slate-950 shadow-gold",
              "hover:from-amber-500 hover:to-amber-400",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-300"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Gerando...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Gerar PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {resultado === 'success' && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-green-400 mb-1">
                PDF Gerado com Sucesso!
              </h4>
              <p className="text-slate-400 text-sm mb-4">
                Seu documento foi compilado e está pronto para download.
              </p>
              <button
                onClick={downloadPdf}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium",
                  "bg-green-500 text-slate-950",
                  "hover:bg-green-400",
                  "transition-all duration-300"
                )}
              >
                <Download className="w-5 h-5" />
                Baixar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {erro && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-medium text-red-400 mb-2">
                Erro na Compilação
              </h4>
              <pre className="text-slate-300 text-sm whitespace-pre-wrap font-mono bg-slate-950/50 rounded-lg p-4 overflow-x-auto max-h-64 overflow-y-auto">
                {erro}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
        <p className="text-xs text-amber-500/80 leading-relaxed">
          <strong>Dica:</strong> Use Tab para indentar o código. O servidor utiliza XeLaTeX 
          com suporte a fontspec. Fontes do sistema Windows (Arial, Times New Roman) estão disponíveis.
        </p>
      </div>
    </div>
  )
}
