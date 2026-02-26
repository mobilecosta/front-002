# Front 002 - Controle Financeiro (Angular)

Frontend Angular consumindo exclusivamente a API (`api-002`).

## Regras
- Nao usa `supabase-js`
- Nao usa `SUPABASE_URL`
- Nao usa `ANON_KEY`
- Nao conecta direto no banco
- Consome apenas API via `VITE_API_URL`

## Variáveis de ambiente
Defina no build/deploy:
```env
VITE_API_URL="http://localhost:3000"
```

## Fluxo local
```bash
npm install
npm start
```

## Funcionalidades entregues
- Login/registro com JWT do backend
- Guard de rota autenticada
- Dashboard consumindo `GET /dashboard/overview`
- Logout local

## Deploy na Vercel
- Projeto estático Angular
- Configure `VITE_API_URL` para a URL da API em produção
- Nao enviar chaves Supabase para o frontend