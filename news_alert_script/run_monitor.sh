#!/bin/bash
cd /workspaces/bbruno123.github.io/news_alert_script
source .venv/bin/activate
export ALERT_TO="ryanfabres@gmail.com"
export GMAIL_USER="bruno.spams.email@gmail.com"
export GMAIL_APP_PASSWORD=""
export MONITOR_DB="$PWD/monitor.sqlite3"
export MONITOR_LOG="$PWD/monitor.log"
echo "===== INICIANDO $(date) ====="
python3 news_monitor/monitor_universal.py
echo "===== FINALIZADO $(date) ====="
