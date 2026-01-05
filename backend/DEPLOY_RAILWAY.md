# 🚂 Deploy no Railway.app (RECOMENDADO)

Railway.app é a forma mais fácil de fazer deploy desta aplicação. Suporta Docker e oferece plano gratuito.

## 🎯 **Por que Railway?**

✅ Suporta Docker (pode instalar LaTeX)  
✅ Deploy automático via GitHub  
✅ SSL/HTTPS gratuito  
✅ Domínio gratuito (.railway.app)  
✅ Plano gratuito: $5 de crédito/mês  
✅ Logs em tempo real  
✅ Fácil de usar  

## 📋 **Passo a Passo**

### 1. Preparar o Repositório

**a) Criar repositório no GitHub:**
```bash
cd "g:\Meu Drive\Projetos\Sociedade Liberatori\GeradorPDF\web"
git init
git add .
git commit -m "Initial commit - Gerador PDF LaTeX"
```

**b) Criar repositório no GitHub:**
- Acesse https://github.com/new
- Nome: `gerador-pdf-latex`
- Visibilidade: Private (recomendado)
- Clique em "Create repository"

**c) Fazer push:**
```bash
git remote add origin https://github.com/SEU_USUARIO/gerador-pdf-latex.git
git branch -M main
git push -u origin main
```

### 2. Deploy no Railway

**a) Criar conta:**
- Acesse https://railway.app
- Clique em "Start a New Project"
- Faça login com GitHub

**b) Criar novo projeto:**
1. Clique em "New Project"
2. Selecione "Deploy from GitHub repo"
3. Selecione o repositório `gerador-pdf-latex`
4. Railway detectará automaticamente o `Dockerfile`

**c) Configurar variáveis (opcional):**
- Clique no projeto
- Vá em "Variables"
- Adicione se necessário:
  - `FLASK_ENV=production`
  - `PORT=5000`

**d) Deploy automático:**
Railway fará o build e deploy automaticamente!

### 3. Acessar a Aplicação

Após o deploy (2-5 minutos):
1. Clique no projeto
2. Vá em "Settings" → "Domains"
3. Clique em "Generate Domain"
4. Acesse: `https://seu-projeto.railway.app`

## 🔄 **Atualizações Automáticas**

Qualquer commit no GitHub dispara deploy automático:
```bash
# Fazer alterações no código
git add .
git commit -m "Descrição da mudança"
git push
```

Railway fará o deploy automaticamente em 2-3 minutos.

## 💰 **Custos**

**Plano Gratuito:**
- $5 de crédito/mês
- ~500 horas de execução
- Suficiente para testes e uso moderado

**Plano Hobby ($5/mês):**
- $5 de crédito + $5 adicionais
- ~1000 horas de execução
- Melhor para produção

## 🐛 **Troubleshooting**

### Build falha
Verifique os logs no Railway:
- Clique no projeto
- Vá em "Deployments"
- Clique no deployment
- Veja os logs

### Aplicação não inicia
Verifique se a porta está correta:
```python
# No app.py, no final:
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
```

### LaTeX não funciona
Verifique se o `Dockerfile` está correto e inclui:
```dockerfile
texlive-xetex
texlive-fonts-recommended
texlive-latex-extra
```

## 🎉 **Pronto!**

Sua aplicação estará disponível 24/7 com:
- HTTPS automático
- Domínio gratuito
- Deploy automático
- Logs em tempo real
- Suporte completo a LaTeX

## 🔗 **Links Úteis**

- Railway Dashboard: https://railway.app/dashboard
- Documentação: https://docs.railway.app
- Status: https://status.railway.app
