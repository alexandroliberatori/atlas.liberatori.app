import { Download, FileText, Target, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export function MissionPanel({ phase, onDownload, loading }) {
  if (!phase) {
    return (
      <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center">
        <Target className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="font-serif text-xl text-slate-400 mb-2">
          Selecione uma Fase
        </h3>
        <p className="text-slate-500 text-sm">
          Clique em uma fase no mapa para ver sua missão
        </p>
      </div>
    )
  }

  return (
    <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500/10 to-transparent border-b border-slate-800 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <span className="text-xs text-slate-500 block">Fase {phase.id}</span>
            <h3 className="font-serif text-xl text-amber-500">{phase.name}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-amber-500" />
            Descrição
          </h4>
          <p className="text-slate-300 leading-relaxed">
            {phase.description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <h4 className="text-sm font-medium text-slate-400 mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-500" />
            Material da Missão
          </h4>
          
          <button
            onClick={() => onDownload(phase)}
            disabled={loading}
            className={cn(
              "w-full flex items-center justify-between",
              "px-4 py-3 rounded-xl",
              "bg-slate-950/50 border border-slate-700",
              "hover:border-amber-500/50 hover:bg-slate-900/50",
              "transition-all duration-300 group",
              loading && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                <FileText className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-left">
                <span className="text-slate-200 block text-sm font-medium">
                  Missão_{phase.name}.pdf
                </span>
                <span className="text-slate-500 text-xs">
                  Clique para baixar
                </span>
              </div>
            </div>
            
            <Download className={cn(
              "w-5 h-5 text-slate-500",
              "group-hover:text-amber-500 transition-colors",
              loading && "animate-bounce"
            )} />
          </button>
        </div>

        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4">
          <p className="text-xs text-amber-500/80 leading-relaxed">
            <strong>Importante:</strong> Complete todas as tarefas desta missão 
            antes de enviar seu PDF de entrega. Sua progressão depende da 
            aprovação do material enviado.
          </p>
        </div>
      </div>
    </div>
  )
}
