# Hostinger Node.js + MySQL Starter

A production-ready Node.js application built for Hostinger Web Hosting using Express.js and MySQL.

---

## Features

- Express.js Server
- MySQL Database Connection
- Environment Variables (.env)
- Axios HTTP Requests
- Excel Export (SheetJS)
- REST API Examples
- Production Ready
- Hostinger Compatible

---

## Project Structure

```
project/
│
├── app.js
├── db.js
├── package.json
├── .env
└── README.md
```

---

## Requirements

- Node.js 18+
- MySQL Database
- Hostinger Node.js Hosting

---

## Installation

Install dependencies

```bash
npm install
```

Run the project

```bash
npm start
```

Development Mode

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file.

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=your_database_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

---

## API Routes

### Home

```
GET /
```

Returns the welcome page.

---

### Test Database

```
GET /db-test
```

Example Response

```json
{
  "success": true,
  "database": "Connected",
  "result": 2
}
```

---

### Get Users

```
GET /users
```

Returns the first 50 users.

---

### Create User

```
POST /users
```

Body

```json
{
  "name": "John",
  "email": "john@example.com"
}
```

---

### Fetch External API

```
GET /fetch-data
```

Downloads sample user data using Axios.

---

### Export Excel

```
GET /export-excel
```

Downloads the users table as an Excel file.

---

## Deployment on Hostinger

1. Upload all project files.
2. Run:

```bash
npm install
```

3. Set:

- Startup File: `app.js`
- Node Version: 18+

4. Restart the application.

5. Visit:

```
https://yourdomain.com/db-test
```

If the response is

```json
{
  "success": true,
  "database": "Connected",
  "result": 2
}
```

your MySQL connection is working successfully.

---

## Install Required Packages

```bash
npm install express mysql2 dotenv axios xlsx
```

---

## License

ISC
