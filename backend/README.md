# Gerador de PDF LaTeX - Versão Web

Aplicação web para gerar PDFs a partir de código LaTeX com interface moderna e responsiva.

## 🚀 Recursos

- ✅ Interface web moderna e intuitiva
- ✅ Editor de código LaTeX com syntax highlighting
- ✅ Compilação em tempo real com XeLaTeX
- ✅ Suporte a fontspec e fontes do sistema
- ✅ Download direto do PDF gerado
- ✅ Exemplos pré-carregados
- ✅ Tratamento de erros detalhado
- ✅ Design responsivo (mobile-friendly)

## 📋 Requisitos

### Backend
- Python 3.8 ou superior
- Flask 3.0.0
- XeLaTeX (MiKTeX no Windows)

### Sistema
O servidor precisa ter o XeLaTeX instalado:
- **Windows**: [MiKTeX](https://miktex.org/)
- **Linux**: `sudo apt-get install texlive-xetex`
- **Mac**: [MacTeX](https://www.tug.org/mactex/)

## 🛠️ Instalação

1. **Instalar dependências Python**:
   ```bash
   cd web
   pip install -r requirements.txt
   ```

2. **Verificar instalação do XeLaTeX**:
   ```bash
   xelatex --version
   ```

3. **Executar o servidor**:
   ```bash
   python app.py
   ```

4. **Acessar no navegador**:
   ```
   http://localhost:5000
   ```

## 📁 Estrutura do Projeto

```
web/
├── app.py                 # Backend Flask
├── requirements.txt       # Dependências Python
├── README.md             # Este arquivo
├── templates/
│   └── index.html        # Interface HTML
├── static/
│   ├── style.css         # Estilos CSS
│   └── script.js         # Lógica JavaScript
└── temp_pdfs/            # PDFs temporários (criado automaticamente)
```

## 🎨 Tecnologias Utilizadas

### Backend
- **Flask**: Framework web Python
- **subprocess**: Execução do XeLaTeX
- **tempfile**: Gerenciamento de arquivos temporários

### Frontend
- **HTML5**: Estrutura da página
- **CSS3**: Estilização moderna com gradientes
- **JavaScript (Vanilla)**: Interatividade e requisições AJAX
- **Fetch API**: Comunicação com o backend

## 🔧 Endpoints da API

### `GET /`
Renderiza a página principal

### `GET /verificar-latex`
Verifica se o XeLaTeX está instalado
```json
{
  "disponivel": true,
  "mensagem": "XeLaTeX está instalado e pronto para uso!"
}
```

### `POST /gerar-pdf`
Gera PDF a partir do código LaTeX
```json
{
  "codigo": "\\documentclass{article}..."
}
```

Resposta de sucesso:
```json
{
  "sucesso": true,
  "pdf_id": "uuid-do-pdf",
  "mensagem": "PDF gerado com sucesso!"
}
```

### `GET /download/<pdf_id>`
Faz download do PDF gerado

### `POST /limpar-temporarios`
Remove PDFs temporários com mais de 1 hora

## ⚙️ Configuração

### Porta do servidor
Edite em `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Timeout de compilação
Edite em `app.py`:
```python
timeout=30  # segundos
```

### Limpeza automática
PDFs temporários são mantidos por 1 hora. Ajuste em `limpar_temporarios()`.

## 🐛 Solução de Problemas

### "XeLaTeX não encontrado"
- Instale o MiKTeX e adicione ao PATH do sistema
- Reinicie o terminal após a instalação

### Erro de compilação
- Verifique se o código LaTeX está correto
- Veja os detalhes do erro na interface
- Teste com o exemplo fornecido

### Porta já em uso
- Altere a porta em `app.py`
- Ou encerre o processo que está usando a porta 5000

## 🚀 Deploy em Produção

### Opção 1: Servidor Local
```bash
python app.py
```

### Opção 2: Gunicorn (Linux)
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Opção 3: Docker
Crie um `Dockerfile`:
```dockerfile
FROM python:3.11-slim
RUN apt-get update && apt-get install -y texlive-xetex
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

## 📝 Notas

- PDFs temporários são armazenados em `temp_pdfs/`
- Arquivos com mais de 1 hora são automaticamente removidos
- A aplicação suporta múltiplos usuários simultâneos
- Cada PDF gerado recebe um UUID único

## 🔒 Segurança

- Timeout de 30 segundos para evitar compilações infinitas
- Validação de entrada no backend
- Arquivos temporários isolados por UUID
- Limpeza automática de arquivos antigos

## 📄 Licença

Projeto da Sociedade Liberatori
