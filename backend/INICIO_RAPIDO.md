# 🚀 Início Rápido - Gerador PDF LaTeX Web

## ✅ Passo a Passo

### 1️⃣ Iniciar o Servidor

```bash
cd web
python app.py
```

### 2️⃣ Abrir no Navegador

Acesse: **http://localhost:5000**

### 3️⃣ Carregar Exemplo

Clique no botão **"📝 Carregar Exemplo"** no topo da página

### 4️⃣ Gerar PDF

Clique no botão verde **"🚀 Gerar PDF"**

### 5️⃣ Baixar

Quando aparecer a mensagem de sucesso, clique em **"📥 Baixar PDF"**

---

## ⚠️ Problemas Comuns

### Erro: "fontspec não é compatível"

**Solução**: Clique em **"Carregar Exemplo"** para usar código compatível com PDFLaTeX.

O pacote `fontspec` só funciona com XeLaTeX/LuaLaTeX. Esta aplicação usa PDFLaTeX.

### Erro: "PDFLaTeX não encontrado"

**Solução**: Instale o MiKTeX:
1. Baixe de: https://miktex.org/download
2. Instale com configurações padrão
3. Reinicie o servidor

### Primeira compilação demora muito

**Normal**: A primeira compilação pode demorar 30-60 segundos porque o MiKTeX está instalando pacotes. As próximas serão rápidas (5-10 segundos).

---

## 📝 Exemplo de Código Compatível

```latex
\documentclass{article}

\title{Meu Documento}
\author{Seu Nome}

\begin{document}
\maketitle

\section{Introducao}
Texto da introducao.

\section{Conteudo}
\begin{itemize}
  \item Item 1
  \item Item 2
\end{itemize}

\end{document}
```

---

## 🎨 Recursos Suportados

✅ Estrutura de documento (article, report, book)  
✅ Seções e subseções  
✅ Listas (itemize, enumerate)  
✅ Tabelas  
✅ Imagens (se estiverem no servidor)  
✅ Matemática (equações, fórmulas)  
✅ Bibliografia  
✅ Referências cruzadas  

❌ Pacote fontspec (use XeLaTeX para isso)  
❌ Fontes personalizadas do sistema  

---

## 💡 Dicas

- Use o botão **"Limpar"** para começar do zero
- O código é salvo no editor enquanto a página estiver aberta
- PDFs temporários são deletados após 1 hora
- Suporta acentuação em português (use `\usepackage[utf8]{inputenc}`)

---

## 🔧 Comandos Úteis

### Parar o servidor
Pressione `Ctrl+C` no terminal

### Verificar se PDFLaTeX está instalado
```bash
pdflatex --version
```

### Limpar PDFs temporários manualmente
```bash
# No diretório web/
rm -rf temp_pdfs/*  # Linux/Mac
del /Q temp_pdfs\*  # Windows
```
