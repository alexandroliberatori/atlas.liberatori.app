import sys
import os

# Adiciona o diretório da aplicação ao path
INTERP = os.path.join(os.environ['HOME'], 'virtualenv', 'geradorpdf', '3.9', 'bin', 'python3')
if sys.executable != INTERP:
    os.execl(INTERP, INTERP, *sys.argv)

# Adiciona o diretório atual ao path
sys.path.insert(0, os.path.dirname(__file__))

# Importa a aplicação Flask
from app import app as application
