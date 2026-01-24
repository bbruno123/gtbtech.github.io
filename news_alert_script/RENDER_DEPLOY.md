# Deploy no Render (Gratuito)

## Passo a passo

### 1. Criar conta no Render
- Acesse: https://render.com
- Faça login com GitHub

### 2. Criar novo Cron Job
- No dashboard, clique em "New +"
- Selecione "Cron Job"
- Conecte ao repositório `bbruno123/gtbtech.github.io`
- O Render vai detectar automaticamente o `render.yaml`

### 3. Configurar variáveis de ambiente
No painel do Cron Job, vá em "Environment" e adicione:

```
ALERT_TO=ryanfabres@gmail.com
GMAIL_USER=bruno.spams.email@gmail.com
GMAIL_APP_PASSWORD=ttdz yzix pklw ngsd
```

### 4. Deploy
- Clique em "Create Cron Job"
- O Render vai fazer o deploy automaticamente
- O job vai rodar **de hora em hora** (0 * * * *)

### 5. Monitorar
- Veja os logs em tempo real no dashboard do Render
- Cada execução fica registrada com logs completos
- 100% gratuito, sem limites

## Alterar frequência

Edite `render.yaml` linha `schedule`:
- `0 * * * *` = de hora em hora
- `*/30 * * * *` = a cada 30 minutos
- `0 */2 * * *` = a cada 2 horas
- `0 9 * * *` = todo dia às 9h

Depois faça commit e push; o Render atualiza automaticamente.

## Persistência do banco de dados

⚠️ **Importante**: No plano gratuito do Render, o filesystem é efêmero (reseta a cada deploy). Para persistir o `monitor.sqlite3`:
- Use Render Disks (pago)
- Ou armazene em serviço externo (Supabase, PlanetScale gratuito)
- Ou aceite que o histórico reseta periodicamente

Para o caso de uso atual (apenas verificar notícias novas), o banco efêmero funciona bem.
