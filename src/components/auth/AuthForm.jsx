import { useState } from 'react'
import { Compass, Mail, Lock, Loader2, Eye, EyeOff } from 'lucide-react'
import { cn } from '../../lib/utils'
import { supabase } from '../../lib/supabase'

export function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        onAuthSuccess(data.session)
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        if (data.user && !data.session) {
          setMessage('Verifique seu e-mail para confirmar o cadastro.')
        } else {
          onAuthSuccess(data.session)
        }
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-atlas-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900/50 border-2 border-amber-500/30 mb-4 animate-gold-glow">
            <Compass className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="font-serif text-3xl text-amber-500 tracking-wide mb-2">
            Atlas Liberatori
          </h1>
          <p className="text-slate-400 text-sm">
            Portal exclusivo da Sociedade Liberatori
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900/30 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 shadow-xl"
        >
          <h2 className="font-serif text-xl text-slate-200 mb-6 text-center">
            {isLogin ? 'Entrar no Portal' : 'Criar Conta'}
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm">
              {message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "w-full pl-11 pr-4 py-3 rounded-lg",
                    "bg-slate-950/50 border border-slate-700",
                    "text-slate-200 placeholder:text-slate-600",
                    "focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30",
                    "transition-all duration-300"
                  )}
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "w-full pl-11 pr-12 py-3 rounded-lg",
                    "bg-slate-950/50 border border-slate-700",
                    "text-slate-200 placeholder:text-slate-600",
                    "focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30",
                    "transition-all duration-300"
                  )}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full mt-6 py-3 rounded-lg font-medium",
              "bg-gradient-to-r from-amber-600 to-amber-500",
              "text-slate-950 shadow-gold",
              "hover:from-amber-500 hover:to-amber-400",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-300",
              "flex items-center justify-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processando...</span>
              </>
            ) : (
              <span>{isLogin ? 'Entrar' : 'Criar Conta'}</span>
            )}
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
                setMessage('')
              }}
              className="text-sm text-slate-400 hover:text-amber-500 transition-colors"
            >
              {isLogin
                ? 'Não tem conta? Criar agora'
                : 'Já tem conta? Fazer login'}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          © {new Date().getFullYear()} Sociedade Liberatori. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
