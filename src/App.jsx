import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { isAdmin } from './lib/config'
import { AuthForm } from './components/auth/AuthForm'
import { Navbar } from './components/layout/Navbar'
import { NavigationMap } from './components/map/NavigationMap'
import { MissionPanel } from './components/dashboard/MissionPanel'
import { UploadZone } from './components/dashboard/UploadZone'
import { PdfGenerator } from './components/admin/PdfGenerator'
import { getPublicUrl } from './lib/supabase'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentPhase, setCurrentPhase] = useState(1)
  const [selectedPhase, setSelectedPhase] = useState(null)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [currentView, setCurrentView] = useState('dashboard')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setSelectedPhase(null)
    setCurrentView('dashboard')
  }

  const userIsAdmin = session?.user?.email && isAdmin(session.user.email)

  const handlePhaseSelect = (phase) => {
    setSelectedPhase(phase)
  }

  const handleDownload = async (phase) => {
    setDownloadLoading(true)
    try {
      const url = getPublicUrl(`missions/fase_${phase.id}/missao.pdf`)
      window.open(url, '_blank')
    } catch (error) {
      console.error('Erro ao baixar:', error)
    } finally {
      setDownloadLoading(false)
    }
  }

  const handleUploadSuccess = () => {
    console.log('Upload realizado com sucesso!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-atlas-bg flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return <AuthForm onAuthSuccess={setSession} />
  }

  return (
    <div className="min-h-screen bg-atlas-bg">
      <Navbar 
        user={session.user} 
        onLogout={handleLogout}
        isAdmin={userIsAdmin}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {currentView === 'pdf-generator' && userIsAdmin ? (
          <PdfGenerator />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="font-serif text-2xl sm:text-3xl text-amber-500 mb-2">
                Sua Jornada
              </h2>
              <p className="text-slate-400">
                Navegue pelo mapa e complete suas missões para avançar
              </p>
            </div>

            <div className="mb-8">
              <NavigationMap
                currentPhase={currentPhase}
                onPhaseSelect={handlePhaseSelect}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <MissionPanel
                phase={selectedPhase}
                onDownload={handleDownload}
                loading={downloadLoading}
              />
              
              <UploadZone
                phase={selectedPhase}
                userId={session.user.id}
                onUploadSuccess={handleUploadSuccess}
              />
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-slate-800 py-6 text-center">
        <p className="text-xs text-slate-600">
          © {new Date().getFullYear()} Sociedade Liberatori. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  )
}

export default App
