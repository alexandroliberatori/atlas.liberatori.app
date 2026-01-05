FROM python:3.9-slim

# Instalar TeX Live e dependências
RUN apt-get update && apt-get install -y \
    texlive-xetex \
    texlive-fonts-recommended \
    texlive-latex-extra \
    texlive-lang-portuguese \
    fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

# Criar diretório de trabalho
WORKDIR /app

# Copiar requirements e instalar dependências Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código da aplicação
COPY app.py .
COPY templates/ templates/
COPY static/ static/

# Criar diretório para PDFs temporários
RUN mkdir -p temp_pdfs && chmod 777 temp_pdfs

# Expor porta
EXPOSE 5000

# Variáveis de ambiente
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Comando para iniciar a aplicação
CMD ["python", "app.py"]
