@echo off
echo ========================================
echo  Gerador de PDF LaTeX - Versao Web
echo ========================================
echo.

REM Adiciona os caminhos comuns do MiKTeX ao PATH temporariamente
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin

echo [1/3] Verificando XeLaTeX...
where xelatex >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] XeLaTeX nao foi encontrado!
    echo.
    echo Instale o MiKTeX antes de continuar.
    echo Download: https://miktex.org/download
    echo.
    pause
    exit /b 1
)
echo [OK] XeLaTeX encontrado!

echo.
echo [2/3] Verificando dependencias Python...
pip show Flask >nul 2>&1
if %errorlevel% neq 0 (
    echo Flask nao encontrado. Instalando dependencias...
    pip install -r requirements.txt
) else (
    echo [OK] Flask instalado!
)

echo.
echo [3/3] Iniciando servidor web...
echo.
echo ========================================
echo  Servidor rodando em:
echo  http://localhost:5000
echo ========================================
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

python app.py

pause
