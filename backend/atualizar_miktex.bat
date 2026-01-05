@echo off
echo ========================================
echo  ATUALIZACAO OBRIGATORIA DO MIKTEX
echo ========================================
echo.
echo Este script vai atualizar o MiKTeX para resolver
echo o erro "So far, you have not checked for MiKTeX updates"
echo.
pause

REM Adiciona os caminhos do MiKTeX ao PATH
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin

echo.
echo [1/3] Atualizando banco de dados de pacotes...
miktex packages update-package-database
if %errorlevel% neq 0 (
    echo [ERRO] Falha ao atualizar banco de dados
    echo Tente abrir o MiKTeX Console manualmente
    pause
    exit /b 1
)

echo.
echo [2/3] Atualizando banco de dados de fontes...
initexmf --update-fndb
initexmf --mkmaps

echo.
echo [3/3] Configurando instalacao automatica...
initexmf --set-config-value [MPM]AutoInstall=1

echo.
echo ========================================
echo  ATUALIZACAO CONCLUIDA!
echo ========================================
echo.
echo Agora:
echo 1. Reinicie o servidor Flask (Ctrl+C e python app.py)
echo 2. Tente gerar o PDF novamente
echo.
pause
