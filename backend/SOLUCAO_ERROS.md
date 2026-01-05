# Solução de Erros Comuns - Gerador PDF LaTeX

## ❌ Erro: "So far, you have not checked for MiKTeX updates"

### Causa
O MiKTeX precisa ser atualizado e configurado corretamente antes do primeiro uso.

### Solução

#### 1. Atualizar o MiKTeX

**Opção A - Via MiKTeX Console (Recomendado)**:
1. Abra o **MiKTeX Console** (procure no menu Iniciar)
2. Clique em **"Check for updates"**
3. Se houver atualizações, clique em **"Update now"**
4. Aguarde a conclusão

**Opção B - Via linha de comando**:
```bash
miktex packages update
miktex packages install-some
```

#### 2. Configurar instalação automática de pacotes

No **MiKTeX Console**:
1. Vá em **Settings**
2. Em **"Install missing packages on-the-fly"**, selecione **"Yes"**
3. Clique em **"OK"**

#### 3. Testar a instalação

Execute no terminal:
```bash
xelatex --version
```

Deve mostrar a versão do XeLaTeX sem erros.

## ❌ Erro: "Undefined y coordinate" ou problemas com fontes

### Causa
Problemas ao gerar métricas de fontes antigas ou incompatíveis.

### Solução

Use fontes modernas do Windows que funcionam bem com XeLaTeX:
- **Times New Roman** (recomendado)
- **Arial**
- **Calibri**
- **Segoe UI**

Exemplo:
```latex
\documentclass{article}
\usepackage{fontspec}
\setmainfont{Times New Roman}  % Fonte segura
```

## ❌ Erro: Timeout na compilação

### Causa
Primeira compilação demora porque o MiKTeX está instalando pacotes.

### Solução

1. Aguarde até 2 minutos na primeira compilação
2. Próximas compilações serão rápidas (5-10 segundos)
3. Se continuar lento, atualize o MiKTeX (ver solução acima)

## 📝 Exemplo LaTeX Testado e Funcional

```latex
\documentclass{article}
\usepackage{fontspec}
\setmainfont{Times New Roman}

\title{Meu Documento}
\author{Seu Nome}
\date{\today}

\begin{document}
\maketitle

\section{Introducao}
Este e um documento de teste.

\section{Conteudo}
Aqui vai o conteudo principal.

\end{document}
```

## 🔧 Comandos Úteis

### Verificar instalação do XeLaTeX
```bash
xelatex --version
```

### Listar fontes disponíveis
```bash
fc-list
```

### Atualizar todos os pacotes MiKTeX
```bash
miktex packages update-package-database
miktex packages update
```

### Limpar cache do MiKTeX
```bash
miktex fndb refresh
```

## 🚀 Checklist Antes de Usar

- [ ] MiKTeX instalado
- [ ] MiKTeX atualizado (via MiKTeX Console)
- [ ] Instalação automática de pacotes ativada
- [ ] XeLaTeX funcionando (`xelatex --version`)
- [ ] Usar fontes padrão do Windows (Times New Roman, Arial)
- [ ] Evitar acentos especiais no primeiro teste

## 📞 Ainda com problemas?

1. Desinstale e reinstale o MiKTeX completamente
2. Durante a instalação, marque **"Install missing packages automatically"**
3. Após instalar, abra o MiKTeX Console e atualize tudo
4. Teste com o exemplo simples acima
