# sdi-project-3
A full stack bank dashboard to keep track of your accounts and transactions.


# Built With
- React.js
- Express
- PostgresSQL
- Knex.js

# Features
- View Bank Accounts
    - Account Numbers
    - Account Type
    - Current Balance

- View most recent transactions

- Click on an account to view account details

# Endpoints

GET:
    /accounts
    /accounts/:id
    /accounts/:id/transactions
    /transactions
    /transactions/:id
    /categories
    /categories/:id

POST:
    accounts/:id/transactions
    /accounts
    /categories
    /transactions

PUT:
    /accounts/:id
    /categories/:id
    /transactions/:id

DELETE:
    /accounts/:id
    /categories/:id
    /transactions/:id

# Installation
git clone https://github.com/ConnorArretche/sdi-project-3#

cd api
npm install

cd ui
npm install

Migrate and seed database with:
npx knex migrate:latest
npx knex seed:run

cd into api -> npm run dev -> http://localhost:8081 for backend

cd into ui -> npm run dev -> http://localhost:5173 -> for front end

