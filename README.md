# sdi-project-3
A full stack bank dashboard to keep track of your accounts and transactions.

This application will allow you to keep track of your finances by monitoring your accounts and transactions. You can also add and delete transactions, and edit account information. Want a different look to the website? Check out the settings to change to dark mode or light mode! Want to feel rich? Toggle on Rich Mode to make your accounts look like you have a lot of money and impress your friends!



# Built With
- React.js
- Express
- PostgreSQL
- Knex.js

# Features
- View Bank Accounts
    - Account Numbers
    - Account Type
    - Current Balance

- View most recent transactions

- Click on an account to view account details

- Themes: Dark Mode and Light Mode

- Rich Mode: Toggle on to make your account balances look rich

- Add/ Delete Transactions

- Edit Accounts

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
git clone https://github.com/ConnorArretche/sdi-project-3.git

docker run

cd api
npm install

cd ui
npm install

Migrate and seed database with:
npx knex migrate:latest
npx knex seed:run

cd into api -> npm run dev -> http://localhost:8081 for backend

cd into ui -> npm run dev -> http://localhost:5173 -> for front end

