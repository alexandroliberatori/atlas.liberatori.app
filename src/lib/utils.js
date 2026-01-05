import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const PHASES = [
  { id: 1, name: 'Despertar', description: 'O início da jornada' },
  { id: 2, name: 'Fundamentos', description: 'Construindo as bases' },
  { id: 3, name: 'Expansão', description: 'Ampliando horizontes' },
  { id: 4, name: 'Domínio', description: 'Consolidando conhecimento' },
  { id: 5, name: 'Maestria', description: 'O caminho do mestre' },
]

export const getPhaseStatus = (phaseId, currentPhase) => {
  if (phaseId < currentPhase) return 'completed'
  if (phaseId === currentPhase) return 'current'
  return 'locked'
}
