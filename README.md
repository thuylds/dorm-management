# Dorm Management

Full-stack dormitory management system based on the provided `DORM MANAGEMENT.docx`.

## Stack

- SQL Server: normalized schema, constraints, indexes, seed data, and triggers
- Node.js + Express: REST API
- React + Vite: management dashboard

## Run locally

1. Create a SQL Server database and execute `database/01-schema.sql`, then `database/02-seed.sql`.
2. Copy `server/.env.example` to `server/.env` and update the SQL Server connection.
3. Start the API:

   ```bash
   cd server
   npm install
   npm run dev
   ```

4. Start the frontend in another terminal:

   ```bash
   cd client
   npm install
   npm run dev
   ```

The frontend runs on `http://localhost:5173` and proxies `/api` to the API on port `4000`.

