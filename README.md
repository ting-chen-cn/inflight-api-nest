# 🛫 Finnair Pre-Assignment API

A RESTful API built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and PostgreSQL.
This project simulates endpoints for retrieving passengers and flight data, as requested by the inflight crew application team.

## 📦 Tech Stack

* [NestJS](https://docs.nestjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Prisma ORM](https://www.prisma.io/)
* [Docker](https://www.docker.com/)
* [Swagger](https://swagger.io/) via Nest's OpenAPI plugin

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourname/finnair-preassignment.git
cd finnair-preassignment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start PostgreSQL with Docker

```bash
docker-compose up -d
```

> 📝 If you already have PostgreSQL locally, skip this step and update the `DATABASE_URL` in your `.env` file.

### 4. Apply Prisma Migrations

```bash
npx prisma migrate dev
```

> This will:
>
> * Create the database tables
> * Run schema validation
> * Seed sample data (if seed script is configured)

### 5. Start the Development Server

```bash
npm run start:dev
```

### 6. Access the API Docs

Swagger UI: [http://localhost:3000/swagger](http://localhost:3000/swagger)

> Use the Swagger interface to test API endpoints interactively.

---

## 📂 Project Structure

```
src/
  ├── modules/
  │   ├── passenger/
  │   ├── flight/
  │   └── booking/
  ├── prisma/         # Prisma schema and seeding logic
  ├── common/         # Shared DTOs, exceptions, utilities
  └── main.ts
```

---

## 🗺️ Entity Relationship Diagram

The diagram below shows the relationship between Passengers, Bookings, and Flights:

![ERD](./prisma/erd.png)

---

## 🛠️ Helpful Developer Commands

### ✏️ Update Prisma Schema

After modifying `prisma/schema.prisma`:

```bash
# Generate updated Prisma client
npx prisma generate

# Push changes to the DB schema
npx prisma migrate dev
```

> 🚪 If you want to reset the database completely:

```bash
npx prisma migrate reset
```

---

### 🧪 Seed the Database (Optional)

If you have a seed script set up:

```bash
npx prisma db seed
```

---

### 🏠 Generate a New Module

```bash
npx nest g module <module-name>
```

### ➕ Add a Service or Controller

```bash
npx nest g service <name>
npx nest g controller <name>
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/finnairdb
```

You can also use `.env.development`, `.env.test`, etc., if needed.

---

## ✅ Example API Usage

### GET passengers for a flight

```
GET /passengers?flightNumber=AY157&departureDate=2025-07-15
```

### GET a single passenger by ID

```
GET /passengers/1
```

Check Swagger for request and response shape.

---

## 🙋‍♂️️ Author

**Ting Chen**
Made with ❤️ and TypeScript.

---

## 📄 License

MIT
