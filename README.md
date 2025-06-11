# My Next.js Project

This project was bootstrapped with [**create-next-app**](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and includes custom configuration with Prisma, Prisma Studio, and more.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Prisma Studio](https://www.prisma.io/studio)
- [PostgreSQL](https://www.postgresql.org/) _(or your configured DB)_

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Set up Environment Variables

Create a .env file at the root of your project based on the provided .env.example:

```
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database>?schema=public"
```

Replace `<username>`, `<password>`, `<host>`, `<port>`, and `<database>` with your PostgreSQL credentials.

### 3. Generate Prisma Client

```
npx prisma generate
```

This creates the client in node_modules/@prisma/client based on your schema.

### 4. Run Initial Migration

```
npx prisma migrate dev --name init
```

This creates the database tables defined in prisma/schema.prisma.

### 5. (Optional) Open Prisma Studio

```
npx prisma studio
```

This opens a browser-based interface to view and manage your database records.

# Start the Development Server

```
npm run dev
# or
yarn dev
```
