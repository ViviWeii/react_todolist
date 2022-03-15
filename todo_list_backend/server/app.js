const express = require("express");
const cors = require("cors");
const app = express();
app.listen(8000);
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const mysql = require("mysql");
const conn = mysql.createConnection({
    user: "root",
    password: "root",
    host: "localhost",
    port: 3306,
    database: "todo_list",
    multipleStatements: true
});

conn.connect(function (err) {
    if (err) {
        console.log(JSON.stringify(err))
        return;
    }
    console.log("Connection success.");
});

app.get("/", function (req, res) {
    let sql = "SELECT * FROM todotable";
    conn.query(sql,
        [],
        function (err, rows) {
            if (err) {
                res.send(JSON.stringify(err));
            }
            res.send(JSON.stringify(rows));
        });
});

app.post("/addItem", function (req, res) {
    let sql = "INSERT INTO todotable (todoTitle,isComplete) VALUE ( ? , 0 )";
    conn.query(sql,
        [req.body.todoTitle],
        function (err, rows) {
            res.send(JSON.stringify(req.body));
        }
    );
})

app.delete("/deleteItem/:id",function(req,res){
    let sql = `DELETE FROM todotable WHERE id = ?`;
    conn.query(sql,
        [req.params.id],
        function(err,rows){
            res.send(`id: ${req.params.id} 已刪除`);
        });
});

app.put("/editIsComplete/:id",function(req,res){
    let sql = `UPDATE todotable SET isComplete = ? WHERE id = ?`;
    conn.query(sql,
        [req.body.isComplete,req.params.id],
        function(err,rows){
            res.send(JSON.stringify(req.body));
        });
});