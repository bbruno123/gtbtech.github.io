#!/usr/bin/env python3
"""
Script de entrada para execução no Render.
Carrega variáveis de ambiente e executa o monitor.
"""
import os
import sys

# Adiciona o diretório news_monitor ao path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'news_monitor'))

# Importa e executa o monitor
from monitor_universal import main

if __name__ == "__main__":
    # Variáveis de ambiente já estarão definidas no Render
    main()
