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

app.post("/", async (req, res) => {

    try {

        const { nama, nim, kelas } = req.body;

        await pool.query(
            "INSERT INTO biodata(nama,nim,kelas) VALUES($1,$2,$3)",
            [nama, nim, kelas]
        );

        res.status(201).json({
            message: "Data berhasil ditambahkan"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

app.put("/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const { nama, nim, kelas } = req.body;

        await pool.query(
            "UPDATE biodata SET nama=$1,nim=$2,kelas=$3 WHERE id=$4",
            [nama, nim, kelas, id]
        );

        res.status(200).json({
            message: "Data berhasil diupdate"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

app.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM biodata WHERE id=$1",
            [id]
        );

        res.status(200).json({
            message: "Data berhasil dihapus"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: "Database Error"
        });

    }

});

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}`);
});