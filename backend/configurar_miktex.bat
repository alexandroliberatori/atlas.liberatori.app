@echo off
echo ========================================
echo  Configuracao Automatica do MiKTeX
echo ========================================
echo.

REM Adiciona os caminhos comuns do MiKTeX ao PATH temporariamente
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Program Files\MiKTeX\miktex\bin
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin\x64
set PATH=%PATH%;C:\Users\%USERNAME%\AppData\Local\Programs\MiKTeX\miktex\bin

echo [1/4] Verificando MiKTeX...
where miktex-console >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERRO] MiKTeX nao encontrado!
    echo.
    echo Baixe e instale o MiKTeX de: https://miktex.org/download
    echo.
    pause
    exit /b 1
)
echo [OK] MiKTeX encontrado!

echo.
echo [2/4] Atualizando base de dados de pacotes...
miktex packages update-package-database
if %errorlevel% neq 0 (
    echo [AVISO] Nao foi possivel atualizar a base de dados
)

echo.
echo [3/4] Configurando instalacao automatica de pacotes...
initexmf --set-config-value [MPM]AutoInstall=1
if %errorlevel% neq 0 (
    echo [AVISO] Configuracao manual necessaria
    echo Abra o MiKTeX Console e ative "Install missing packages on-the-fly"
)

echo.
echo [4/4] Atualizando formatos...
initexmf --update-fndb
miktex fndb refresh

echo.
echo ========================================
echo  Configuracao concluida!
echo ========================================
echo.
echo Proximos passos:
echo 1. Abra o MiKTeX Console
echo 2. Clique em "Check for updates"
echo 3. Instale todas as atualizacoes
echo 4. Reinicie o servidor web
echo.
pause
