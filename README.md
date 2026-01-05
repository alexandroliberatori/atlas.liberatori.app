# Atlas Liberatori

Portal de membros da **Sociedade Liberatori** - Uma jornada de desenvolvimento pessoal e profissional.

## 🏛️ Sobre o Projeto

O Atlas Liberatori é uma plataforma exclusiva para membros da Sociedade Liberatori, oferecendo:

- **Mapa de Jornada** - Navegação visual pelas fases do programa
- **Sistema de Missões** - Download de materiais e upload de entregas
- **Gerador de PDF** - Ferramenta administrativa para criação de documentos LaTeX

## 🛠️ Stack Tecnológica

### Frontend
- React 19 + Vite
- Tailwind CSS
- Lucide React (ícones)
- Supabase (Auth + Storage)

### Backend (Gerador PDF)
- Python Flask
- XeLaTeX (TeX Live)
- Docker

## 📁 Estrutura do Projeto

```
atlas.liberatori.app/
├── src/                    # Frontend React
│   ├── components/
│   │   ├── admin/          # Componentes administrativos
│   │   ├── auth/           # Autenticação
│   │   ├── dashboard/      # Painel principal
│   │   ├── layout/         # Layout (Navbar)
│   │   └── map/            # Mapa de navegação
│   └── lib/                # Utilitários e configurações
├── backend/                # API Flask para geração de PDF
│   ├── app.py
│   ├── Dockerfile
│   └── templates/
└── public/
```

## 🚀 Desenvolvimento Local

### Frontend
```bash
npm install
npm run dev
```

### Backend (Gerador PDF)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

## 🌐 Deploy

### Frontend
Deploy no Netlify/Vercel apontando para a raiz do projeto.

### Backend
Deploy no Railway usando o Dockerfile em `/backend`.

## 🔐 Variáveis de Ambiente

### Frontend (.env)
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_PDF_GENERATOR_URL=https://seu-backend.railway.app
```

## 📜 Licença

Propriedade da Sociedade Liberatori. Todos os direitos reservados.
