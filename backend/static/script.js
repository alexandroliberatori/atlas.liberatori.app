const editor = document.getElementById('editor-latex');
const btnGerar = document.getElementById('btn-gerar');
const btnExemplo = document.getElementById('btn-exemplo');
const btnLimpar = document.getElementById('btn-limpar');
const btnDownload = document.getElementById('btn-download');
const resultado = document.getElementById('resultado');
const mensagemSucesso = document.getElementById('mensagem-sucesso');
const mensagemErro = document.getElementById('mensagem-erro');
const erroDetalhes = document.getElementById('erro-detalhes');
const statusIcon = document.getElementById('status-icon');
const statusText = document.getElementById('status-text');
const btnIcon = document.getElementById('btn-icon');
const btnText = document.getElementById('btn-text');

let pdfId = null;

const exemploLatex = `\\documentclass{article}

\\title{Exemplo de Teste}
\\author{Sociedade Liberatori}

\\begin{document}
\\maketitle

\\section{Introducao}
Ola mundo! Este e um teste do Gerador de PDF.

\\section{Conteudo}
Este e um documento simples sem pacotes especiais.

\\subsection{Lista de itens}
\\begin{itemize}
  \\item Primeiro item
  \\item Segundo item
  \\item Terceiro item
\\end{itemize}

\\section{Conclusao}
Documento gerado com sucesso.

\\end{document}`;

async function verificarLatex() {
    try {
        const response = await fetch('/verificar-latex');
        const data = await response.json();
        
        if (data.disponivel) {
            statusIcon.textContent = '✅';
            statusText.textContent = 'PDFLaTeX disponível';
            btnGerar.disabled = false;
        } else {
            statusIcon.textContent = '❌';
            statusText.textContent = 'PDFLaTeX não encontrado';
            btnGerar.disabled = true;
            mostrarErro('PDFLaTeX não está instalado no servidor. Instale o MiKTeX para continuar.');
        }
    } catch (error) {
        statusIcon.textContent = '⚠️';
        statusText.textContent = 'Erro ao verificar';
        console.error('Erro ao verificar LaTeX:', error);
    }
}

function mostrarSucesso() {
    resultado.classList.remove('hidden');
    mensagemSucesso.classList.remove('hidden');
    mensagemErro.classList.add('hidden');
}

function mostrarErro(mensagem) {
    resultado.classList.remove('hidden');
    mensagemErro.classList.remove('hidden');
    mensagemSucesso.classList.add('hidden');
    erroDetalhes.textContent = mensagem;
}

function esconderResultado() {
    resultado.classList.add('hidden');
    mensagemSucesso.classList.add('hidden');
    mensagemErro.classList.add('hidden');
}

async function gerarPDF() {
    const codigo = editor.value.trim();
    
    if (!codigo) {
        mostrarErro('Por favor, insira o código LaTeX antes de gerar o PDF.');
        return;
    }

    btnGerar.disabled = true;
    btnIcon.textContent = '⏳';
    btnText.textContent = 'Gerando...';
    btnGerar.classList.add('loading');
    esconderResultado();

    try {
        const response = await fetch('/gerar-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo: codigo }),
        });

        const data = await response.json();

        if (data.sucesso) {
            pdfId = data.pdf_id;
            mostrarSucesso();
        } else {
            mostrarErro(data.erro || 'Erro desconhecido ao gerar PDF.');
        }
    } catch (error) {
        mostrarErro(`Erro de conexão: ${error.message}`);
    } finally {
        btnGerar.disabled = false;
        btnIcon.textContent = '🚀';
        btnText.textContent = 'Gerar PDF';
        btnGerar.classList.remove('loading');
    }
}

function downloadPDF() {
    if (pdfId) {
        window.location.href = `/download/${pdfId}`;
    }
}

function carregarExemplo() {
    editor.value = exemploLatex;
    esconderResultado();
}

function limparEditor() {
    editor.value = '';
    esconderResultado();
    pdfId = null;
}

btnGerar.addEventListener('click', gerarPDF);
btnExemplo.addEventListener('click', carregarExemplo);
btnLimpar.addEventListener('click', limparEditor);
btnDownload.addEventListener('click', downloadPDF);

editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 2;
    }
});

verificarLatex();
carregarExemplo();
