import { Compass, LogOut, User, FileText, Map } from 'lucide-react'
import { cn } from '../../lib/utils'

export function Navbar({ user, onLogout, isAdmin, currentView, onViewChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => onViewChange?.('dashboard')}
            >
              <Compass className="w-8 h-8 text-amber-500" />
              <div>
                <h1 className="font-serif text-xl text-amber-500 tracking-wide">
                  Atlas Liberatori
                </h1>
                <p className="text-xs text-slate-400 -mt-1">
                  Sociedade Liberatori
                </p>
              </div>
            </div>

            {isAdmin && (
              <div className="hidden sm:flex items-center gap-1 ml-4 border-l border-slate-800 pl-6">
                <button
                  onClick={() => onViewChange?.('dashboard')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm",
                    "transition-all duration-300",
                    currentView === 'dashboard'
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  )}
                >
                  <Map className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => onViewChange?.('pdf-generator')}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm",
                    "transition-all duration-300",
                    currentView === 'pdf-generator'
                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  )}
                >
                  <FileText className="w-4 h-4" />
                  Gerador PDF
                </button>
              </div>
            )}
          </div>

          {user && (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-500 border border-amber-500/30">
                  Admin
                </span>
              )}
              
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700">
                <User className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-slate-300">
                  {user.email?.split('@')[0]}
                </span>
              </div>
              
              <button
                onClick={onLogout}
                className={cn(
                  "p-2 rounded-lg transition-all duration-300",
                  "text-slate-400 hover:text-amber-500",
                  "hover:bg-slate-800/50"
                )}
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
