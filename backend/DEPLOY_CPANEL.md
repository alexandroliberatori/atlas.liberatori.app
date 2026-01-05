# 🚀 Deploy da Aplicação em cPanel

## ⚠️ **LIMITAÇÃO IMPORTANTE**

**O cPanel padrão NÃO suporta LaTeX/XeLaTeX** porque:
- LaTeX requer instalação de pacotes do sistema (MiKTeX/TeX Live)
- Servidores compartilhados não permitem instalação de software customizado
- XeLaTeX precisa de acesso root para instalação

## 🎯 **Soluções Alternativas**

### Opção 1: VPS ou Servidor Dedicado (RECOMENDADO)
Use um VPS (DigitalOcean, Linode, AWS EC2, etc.) onde você tem acesso root.

**Vantagens:**
- Controle total do servidor
- Pode instalar TeX Live/MiKTeX
- Melhor performance
- Mais barato a longo prazo

**Custo:** ~$5-10/mês

### Opção 2: Serviço de Conversão LaTeX Online
Modificar a aplicação para usar uma API externa de conversão LaTeX:
- **Overleaf API** (pago)
- **LaTeX.Online** (gratuito com limites)
- **Pdflatex.online** (gratuito)

### Opção 3: Hospedagem Especializada
Plataformas que suportam aplicações Python complexas:
- **Heroku** (com buildpack de LaTeX)
- **Railway.app** (suporta Docker)
- **Render.com** (suporta Docker)
- **PythonAnywhere** (pode instalar LaTeX)

## 📋 **Se você REALMENTE precisa usar cPanel:**

### Pré-requisitos
1. Servidor cPanel com Python App
2. Acesso SSH (para instalar dependências)
3. **Acesso root** (para instalar TeX Live) - **CRÍTICO**

### Passos para Deploy

#### 1. Verificar se o servidor tem LaTeX
```bash
ssh usuario@seuservidor.com
which xelatex
```

Se retornar vazio, você **NÃO** pode usar esta aplicação no cPanel.

#### 2. Se o servidor tiver LaTeX instalado:

**a) Criar ambiente Python no cPanel:**
1. Acesse cPanel → Setup Python App
2. Python version: 3.9+
3. Application root: `/home/usuario/geradorpdf`
4. Application URL: `/` ou `/geradorpdf`
5. Clique em "Create"

**b) Upload dos arquivos:**
```bash
# Via FTP ou File Manager do cPanel, faça upload de:
- app.py
- passenger_wsgi.py
- requirements.txt
- .htaccess
- templates/
- static/
```

**c) Instalar dependências:**
```bash
# Via SSH
cd ~/geradorpdf
source ~/virtualenv/geradorpdf/3.9/bin/activate
pip install -r requirements.txt
```

**d) Configurar permissões:**
```bash
chmod 755 ~/geradorpdf
chmod 644 ~/geradorpdf/passenger_wsgi.py
mkdir -p ~/geradorpdf/temp_pdfs
chmod 777 ~/geradorpdf/temp_pdfs
```

**e) Reiniciar aplicação:**
No cPanel → Python App → Restart

#### 3. Configurar PATH do LaTeX

Edite `passenger_wsgi.py` e adicione:
```python
import os
os.environ['PATH'] = '/usr/local/texlive/2023/bin/x86_64-linux:' + os.environ.get('PATH', '')
```

## 🐳 **Solução DEFINITIVA: Docker + VPS**

Crie um `Dockerfile`:

```dockerfile
FROM python:3.9-slim

# Instalar TeX Live
RUN apt-get update && apt-get install -y \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-latex-extra \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000
CMD ["python", "app.py"]
```

Deploy em qualquer plataforma que suporte Docker:
- Railway.app (gratuito para começar)
- Render.com (gratuito para começar)
- DigitalOcean App Platform ($5/mês)

## 💡 **Recomendação Final**

**NÃO use cPanel para esta aplicação.** Use uma das seguintes opções:

1. **Railway.app** (mais fácil, gratuito para começar)
   - Suporta Docker
   - Deploy automático via GitHub
   - SSL gratuito

2. **DigitalOcean Droplet** ($6/mês)
   - VPS completo
   - Instale TeX Live manualmente
   - Controle total

3. **PythonAnywhere** ($5/mês)
   - Suporta Flask
   - Pode instalar pacotes Python
   - Pode ter TeX Live pré-instalado

## 📞 **Precisa de Ajuda?**

Se você tem um VPS ou servidor com acesso root, posso criar:
- Script de instalação automática
- Configuração de Nginx/Apache
- Systemd service para rodar a aplicação
- Configuração de SSL com Let's Encrypt

Qual opção você prefere seguir?
