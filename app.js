require("dotenv").config();

const express = require("express");
const axios = require("axios");
const XLSX = require("xlsx");
const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


// Verify database connection on startup
async function testDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Connected to MySQL Database");
        connection.release();
    } catch (error) {
        console.error("❌ Database Connection Failed");
        console.error(error.message);
    }
}

testDatabase();


// Home Page
app.get("/", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Hostinger Node.js App</title>
        </head>

        <body style="font-family:Arial;padding:40px">

            <h1>🚀 Hostinger Node.js Application</h1>

            <p>Application is running successfully.</p>

            <ul>
                <li><a href="/db-test">Database Test</a></li>
                <li><a href="/users">Users</a></li>
                <li><a href="/fetch-data">Fetch External API</a></li>
                <li><a href="/export-excel">Export Excel</a></li>
            </ul>

        </body>
        </html>
    `);
});


// Database Test
app.get("/db-test", async (req, res) => {

    try {

        const [rows] = await pool.query("SELECT 1+1 AS result");

        res.json({
            success: true,
            database: "Connected",
            result: rows[0].result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// Get Users
app.get("/users", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM users LIMIT 50"
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// Create User
app.post("/users", async (req, res) => {

    try {

        const { name, email } = req.body;

        const [result] = await pool.query(

            "INSERT INTO users(name,email) VALUES (?,?)",

            [name, email]

        );

        res.json({
            success: true,
            insertedId: result.insertId
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// External API Example
app.get("/fetch-data", async (req, res) => {

    try {

        const response = await axios.get(
            "https://jsonplaceholder.typicode.com/users"
        );

        res.json(response.data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// Export Excel
app.get("/export-excel", async (req, res) => {

    try {

        const [rows] = await pool.query(
            "SELECT * FROM users LIMIT 100"
        );

        const worksheet = XLSX.utils.json_to_sheet(rows);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Users"
        );

        const buffer = XLSX.write(workbook, {
            type: "buffer",
            bookType: "xlsx"
        });

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=users.xlsx"
        );

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.send(buffer);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});
