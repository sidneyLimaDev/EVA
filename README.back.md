# Título do Projeto

# Eva API

Sistema de backend da plataforma Eva, responsável por gerenciar colaboradores, jornadas e o disparo de ações automáticas (como envio de e-mails) conforme o avanço do colaborador em sua jornada.

## 🛠️ Tecnologias

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Bull (gerenciamento de filas com Redis)
- Arquitetura Hexagonal
- Jest (testes automatizados)

## 📁 Estrutura da aplicação

src/\
├─ domain/ # Entidades e Schemas do MongoDB\
├─ application/ # Casos de uso\
├─ infrastructure/\
│ ├─ jobs/ # Processadores da fila Bull\
│ ├─ services/ # Serviços auxiliares (ex: dispatchers)\
│ └─ db/mongo/ # Repositório de conexão ao Mongo\
├─ interfaces/http/ # Controllers e rotas HTTP\
├─ queue.ts # Configuração da fila Bull\
├─ server.ts # Entry point do servidor\
└─ middleware/ # Middlewares customizados

## 📌 Funcionalidades

- ✅ Criação de jornadas
- ✅ Associação de jornadas a colaboradores
- ✅ Ações automatizadas agendadas (via Bull)
- ⏳ Envio de e-mails (em breve)

## ⏳ Processamento Assíncrono com Bull

`acaoProcessor.ts` \
O processador da fila acaoQueue é responsável por executar a ação agendada:

- Se tipo === 'email': envia e-mail via Nodemailer

- Se tipo === 'whatsapp': (placeholder para API futura)

- Caso contrário, exibe um aviso no console

## 📬 Serviço de E-mail

`GMAIL_USER=suaconta@gmail.com`\
`GMAIL_PASS=suasenhaApp`

## ⚙️ Como rodar o projeto

- ✅ Crie um .env utilizando o sample

```bash
# Instalar dependências
npm install

# Rodar em modo dev
npm run dev

# Rodar testes
npm run test
```
<<<<<<< HEAD
=======

Uma breve descrição sobre o que esse projeto faz e para quem ele é
>>>>>>> b29debccb32f9064839d46c8f29b22b7db645907
