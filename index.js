const express = require("express");
const { Pool } = require("pg");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: true, 
})
);




const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "Zaa2006.",
    database: "mahasiswa",
    port: 5432
});

app.get("/", (req, res) => {
    console.log("TEST DATA :");
    pool.query("SELECT * FROM biodata")
        .then((testData) => {
            console.log(testData.rows);
            res.json(testData.rows);
    })
    .catch (err => {
        console.error("Error executing query", err.stack);
        res.status(500).send({ message: "Database Error" });
    });
});



app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});