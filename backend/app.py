from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS
import subprocess
import os
import shutil
import tempfile
from pathlib import Path
import uuid

# Adicionar caminhos do MiKTeX ao PATH do sistema (Windows)
miktex_paths = [
    r"C:\Program Files\MiKTeX\miktex\bin\x64",
    r"C:\Program Files\MiKTeX\miktex\bin",
    r"C:\Users\{}\AppData\Local\Programs\MiKTeX\miktex\bin\x64".format(os.environ.get('USERNAME', '')),
    r"C:\Users\{}\AppData\Local\Programs\MiKTeX\miktex\bin".format(os.environ.get('USERNAME', ''))
]

for path in miktex_paths:
    if os.path.exists(path) and path not in os.environ['PATH']:
        os.environ['PATH'] = path + os.pathsep + os.environ['PATH']

app = Flask(__name__)

# Configurar CORS para permitir requisições do Atlas Liberatori
CORS(app, origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://atlas.liberatori.app",
    "https://*.netlify.app"
])

UPLOAD_FOLDER = 'temp_pdfs'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def verificar_latex():
    """Verifica se o xelatex está instalado e acessível no sistema."""
    return shutil.which("xelatex") is not None

@app.route('/')
def index():
    """Renderiza a página principal."""
    latex_disponivel = verificar_latex()
    return render_template('index.html', latex_disponivel=latex_disponivel)

@app.route('/verificar-latex', methods=['GET'])
def verificar_latex_endpoint():
    """Endpoint para verificar se o LaTeX está instalado."""
    disponivel = verificar_latex()
    return jsonify({
        'disponivel': disponivel,
        'mensagem': 'XeLaTeX está instalado e pronto para uso!' if disponivel else 'XeLaTeX não foi encontrado. Instale o MiKTeX.'
    })

@app.route('/gerar-pdf', methods=['POST'])
def gerar_pdf():
    """Endpoint para gerar PDF a partir do código LaTeX."""
    try:
        if not verificar_latex():
            return jsonify({
                'sucesso': False,
                'erro': 'XeLaTeX não está instalado no servidor. Instale o MiKTeX para continuar.'
            }), 500

        data = request.get_json()
        latex_code = data.get('codigo', '').strip()
        
        if not latex_code:
            return jsonify({
                'sucesso': False,
                'erro': 'O código LaTeX está vazio!'
            }), 400

        # XeLaTeX suporta fontspec, mas precisa ajustar fontes não disponíveis
        import re
        
        # Substituir fontes que podem não estar instaladas por fontes padrão do Windows
        latex_code = re.sub(r'\\babelfont\{rm\}\{Noto Sans\}', r'\\babelfont{rm}{Arial}', latex_code)
        latex_code = re.sub(r'\\setmainfont\{Noto Sans\}', r'\\setmainfont{Arial}', latex_code)
        latex_code = re.sub(r'\\babelfont\{rm\}\{.*?\}', r'\\babelfont{rm}{Arial}', latex_code)

        with tempfile.TemporaryDirectory() as temp_dir:
            temp_tex = os.path.join(temp_dir, "documento.tex")
            
            with open(temp_tex, "w", encoding="utf-8") as f:
                f.write(latex_code)
            
            # Configurar variáveis de ambiente para MiKTeX
            env = os.environ.copy()
            env['MIKTEX_AUTOINSTALL'] = 'yes'  # Instalar pacotes automaticamente
            
            # Tentar atualizar o MiKTeX silenciosamente (ignora erros)
            try:
                subprocess.run(
                    ["initexmf", "--update-fndb"],
                    capture_output=True,
                    timeout=10,
                    env=env
                )
            except:
                pass  # Ignora se falhar
            
            processo = subprocess.run(
                ["xelatex", "-interaction=nonstopmode", "-output-directory", temp_dir, temp_tex],
                capture_output=True,
                text=True,
                timeout=120,  # XeLaTeX pode demorar mais
                env=env
            )

            temp_pdf = os.path.join(temp_dir, "documento.pdf")
            
            # Verifica se o PDF foi criado (isso é mais confiável que o returncode)
            if not os.path.exists(temp_pdf):
                erro_msg = processo.stdout or processo.stderr or "Erro desconhecido na compilação"
                
                # Detecta erro específico do MiKTeX não atualizado
                if 'you have not checked for MiKTeX updates' in erro_msg.lower():
                    return jsonify({
                        'sucesso': False,
                        'erro': 'MiKTeX precisa ser atualizado!\n\n1. Abra o MiKTeX Console\n2. Clique em "Check for updates"\n3. Clique em "Update now"\n4. Reinicie o servidor\n\nOu execute: atualizar_miktex.bat'
                    }), 400
                
                return jsonify({
                    'sucesso': False,
                    'erro': f'Erro na compilação:\n\n{erro_msg[-1000:]}'
                }), 400
            
            pdf_id = str(uuid.uuid4())
            pdf_path = os.path.join(UPLOAD_FOLDER, f"{pdf_id}.pdf")
            shutil.copy(temp_pdf, pdf_path)
            
            return jsonify({
                'sucesso': True,
                'pdf_id': pdf_id,
                'mensagem': 'PDF gerado com sucesso!'
            })

    except subprocess.TimeoutExpired:
        return jsonify({
            'sucesso': False,
            'erro': 'A compilação demorou muito tempo e foi cancelada.'
        }), 408
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': f'Erro inesperado: {str(e)}'
        }), 500

@app.route('/download/<pdf_id>')
def download_pdf(pdf_id):
    """Endpoint para download do PDF gerado."""
    try:
        pdf_path = os.path.join(UPLOAD_FOLDER, f"{pdf_id}.pdf")
        
        if not os.path.exists(pdf_path):
            return jsonify({
                'sucesso': False,
                'erro': 'PDF não encontrado.'
            }), 404
        
        return send_file(
            pdf_path,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='documento.pdf'
        )
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': f'Erro ao baixar PDF: {str(e)}'
        }), 500

@app.route('/limpar-temporarios', methods=['POST'])
def limpar_temporarios():
    """Endpoint para limpar arquivos temporários antigos."""
    try:
        import time
        agora = time.time()
        removidos = 0
        
        for arquivo in os.listdir(UPLOAD_FOLDER):
            caminho = os.path.join(UPLOAD_FOLDER, arquivo)
            if os.path.isfile(caminho):
                idade = agora - os.path.getmtime(caminho)
                if idade > 3600:
                    os.remove(caminho)
                    removidos += 1
        
        return jsonify({
            'sucesso': True,
            'removidos': removidos
        })
    except Exception as e:
        return jsonify({
            'sucesso': False,
            'erro': str(e)
        }), 500

if __name__ == '__main__':
    # Suporta PORT do ambiente (para Railway, Heroku, etc.)
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV', 'development') == 'development'
    app.run(debug=debug, host='0.0.0.0', port=port)
