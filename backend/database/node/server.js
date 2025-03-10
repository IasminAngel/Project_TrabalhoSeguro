import express from "express";
import mysql from 'mysql';

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'trabalho_seguro'
});

const app = new express();

app.get('/', (req, res) => {
    // Executamos a query para o banco de dados
    con.query('SELECT * FROM funcionario', (err, result) => {
        res.send(result);
    })
})

app.listen('3030', () => {
    console.log('Running Server');
})