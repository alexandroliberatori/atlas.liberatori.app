import { MapPin, Lock, CheckCircle, Circle } from 'lucide-react'
import { cn, PHASES, getPhaseStatus } from '../../lib/utils'

export function NavigationMap({ currentPhase, onPhaseSelect }) {
  const mapImageUrl = 'https://atlas.liberatori.app/imgs/fundo.png'

  const phasePositions = [
    { top: '75%', left: '20%' },
    { top: '55%', left: '35%' },
    { top: '40%', left: '55%' },
    { top: '25%', left: '70%' },
    { top: '15%', left: '85%' },
  ]

  return (
    <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mapImageUrl})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/50" />

      {PHASES.map((phase, index) => {
        const status = getPhaseStatus(phase.id, currentPhase)
        const position = phasePositions[index]
        const isLocked = status === 'locked'
        
        return (
          <div
            key={phase.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: position.top, left: position.left }}
          >
            {isLocked && (
              <div 
                className={cn(
                  "absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2",
                  "bg-slate-950/80 rounded-full blur-2xl",
                  "animate-fog-pulse"
                )}
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            )}

            <button
              onClick={() => !isLocked && onPhaseSelect(phase)}
              disabled={isLocked}
              className={cn(
                "relative group flex flex-col items-center gap-2",
                "transition-all duration-500",
                isLocked && "cursor-not-allowed opacity-60"
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center",
                  "border-2 transition-all duration-300",
                  status === 'completed' && "bg-amber-500/20 border-amber-500 shadow-gold",
                  status === 'current' && "bg-amber-500 border-amber-400 shadow-gold-lg animate-gold-glow",
                  status === 'locked' && "bg-slate-900/50 border-slate-700"
                )}
              >
                {status === 'completed' && (
                  <CheckCircle className="w-7 h-7 text-amber-500" />
                )}
                {status === 'current' && (
                  <MapPin className="w-7 h-7 text-slate-950" />
                )}
                {status === 'locked' && (
                  <Lock className="w-6 h-6 text-slate-600" />
                )}
              </div>

              <div
                className={cn(
                  "text-center px-3 py-1.5 rounded-lg",
                  "bg-slate-900/80 backdrop-blur-sm",
                  "border transition-all duration-300",
                  status === 'completed' && "border-amber-500/30",
                  status === 'current' && "border-amber-500/50",
                  status === 'locked' && "border-slate-800"
                )}
              >
                <span className="text-xs text-slate-500 block">
                  Fase {phase.id}
                </span>
                <span
                  className={cn(
                    "font-serif text-sm",
                    status === 'locked' ? "text-slate-500" : "text-amber-500"
                  )}
                >
                  {phase.name}
                </span>
              </div>

              {!isLocked && (
                <div
                  className={cn(
                    "absolute -inset-4 rounded-2xl opacity-0",
                    "group-hover:opacity-100 transition-opacity duration-300",
                    "bg-amber-500/5 border border-amber-500/20"
                  )}
                />
              )}
            </button>
          </div>
        )
      })}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d97706" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {PHASES.slice(0, -1).map((phase, index) => {
          const currentPos = phasePositions[index]
          const nextPos = phasePositions[index + 1]
          const status = getPhaseStatus(phase.id, currentPhase)
          
          if (status === 'locked') return null
          
          return (
            <line
              key={`path-${index}`}
              x1={currentPos.left}
              y1={currentPos.top}
              x2={nextPos.left}
              y2={nextPos.top}
              stroke="url(#pathGradient)"
              strokeWidth="2"
              strokeDasharray="8 4"
              className="opacity-50"
            />
          )
        })}
      </svg>

      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 border border-slate-800">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />
            <span className="text-slate-400">Atual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3 text-amber-500" />
            <span className="text-slate-400">Concluída</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-600" />
            <span className="text-slate-400">Bloqueada</span>
          </div>
        </div>
      </div>
    </div>
  )
}
