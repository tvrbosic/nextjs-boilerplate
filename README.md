# Table of Contents

1. [Next.js Boilerplate Overview](#nextjs-boilerplate)
2. [Getting Started](#getting-started)
   - [1. Clone the Repository and Install Dependencies](#1-clone-the-repository-and-install-dependencies)
   - [2. Setup PostgreSQL Database and Role](#2-setup-postgresql-database-and-role)
   - [3. Prisma ORM Database Workflow Commands](#3-prisma-orm-database-workflow-commands)

---

# Next.js Boilerplate

Full-stack app starter built on Next.js 15, React 19, and Tailwind CSS 4. Comes with JWT-based authentication & authorization, soft delete mechanism, audit log system, global error-handling middleware and more. DX is enhanced with ESLint, Prettier, Husky, and lint-staged.

## Getting Started

To get started with this project, follow these steps:

### 1. Clone the Repository and install dependencies

```bash
git clone https://github.com/tvrbosic/nextjs-boilerplate.git
cd nextjs-boilerplate
npm install
```

### 2. Setup PostgreSQL database and role

Make sure you have PostgreSQL installed. If you want to use different PostgreSQL role, password and database name make sure to change them in [.env](./.env)

1. Log into psql as a superuser:

   ```bash
   sudo -u postgres psql
   ```

2. Create the new user:

   ```sql
   CREATE ROLE nextjsboilerplateuser WITH LOGIN PASSWORD 'NextjsBoilerplateUserPassword';
   ```

3. Grant the user the ability to create databases:

   ```sql
   ALTER ROLE nextjsboilerplateuser CREATEDB;
   GRANT CREATE ON TABLESPACE pg_default TO nextjsboilerplateuser;
   ```

4. List roles to check if the user was granted `CREATEDB`:

   ```bash
   \du
   ```

5. Edit `pg_hba.conf` to allow only `nextjsboilerplateuser` PostgreSQL server connection from the local machine (IPv4 `localhost: 127.0.0.1/32`; IPv6 `localhost::1/128`; Password authentication: `md5`):

   ```plaintext
   host    all    nextjsboilerplateuser    127.0.0.1/32    md5
   host    all    nextjsboilerplateuser    ::1/128         md5
   ```

6. Reload PostgreSQL for changes to apply (assuming you are Linux user):

   ```bash
   sudo systemctl reload postgresql
   ```

7. Create the database from the GUI with `nextjsboilerplateuser` or log into `psql` and create the database there:

   - As superuser:

     ```bash
     sudo -u postgres psql
     CREATE DATABASE "nextjs-boilerplate" WITH OWNER nextjsboilerplateuser;
     ```

   - As `nextjsboilerplateuser`:
     ```bash
     psql -h 127.0.0.1 -U nextjsboilerplateuser -d postgres -W
     CREATE DATABASE "nextjs-boilerplate";
     ```

8. Apply Prisma ORM migrations to the newly created database (inside project root):
   ```bash
   npx prisma migrate deploy
   ```

### 3. Prisma ORM database workflow commands

Full documentation: [Prisma CLI](https://www.prisma.io/docs/orm/reference/prisma-cli-reference#prisma-migrate)

- Apply migrations to the database:

```bash
npx prisma migrate deploy
```

- Create new migrations:

```bash
npx prisma migrate dev --name <migration-name>
```

- Generate Prisma Client:

```bash
npx prisma generate
```

- Check migration status:

```bash
npx prisma migrate status
```

- Reset database (for development):

```bash
npx prisma migrate reset
```
