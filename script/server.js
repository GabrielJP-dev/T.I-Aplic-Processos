// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser")
const Database = require('./database.js');

const app = express();
const port = 3000;

const db = new Database();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(cors());

app.post('/servicos', async (req, res) => {
    const { nome, preco, descricao } = req.body;
    try {
        await db.connect();
        const sql = 'INSERT INTO servicos (name, price, descricao) VALUES (?, ?, ?)';
        const results = await db.query(sql, [nome, preco, descricao]);
        res.status(201).json({ message: 'Serviço criado com sucesso!', results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/servicos', async (req, res) => {
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM servicos;');
        //await db.close();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/agendamentos', async (req, res) => {
    const { Name, ServiceId, Date, Time } = req.body;
    try {
        await db.connect();
        const sql = 'INSERT INTO atendimentos (name, ServiceId, Date, Time) VALUES (?, ?, ?, ?)';
        const results = await db.query(sql, [Name, ServiceId, Date, Time]);
        res.status(201).json({ message: 'Agendamento criado com sucesso!', results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/agendamentos', async (req, res) => {
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM atendimentos;');
        //await db.close();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome,
        email,
        celular,
        nascimento ,
        cpf ,
        senha } = req.body;
    try {
        await db.connect();
        const sql = 'INSERT INTO users (Cpf, Nome, Email, Celular, DataNascimento, Senha) VALUES (?, ?, ?, ?, ?, ?)';
        const results = await db.query(sql, [cpf, nome, email, celular, nascimento, senha]);
        res.status(201).json({ message: 'Usuario criado com sucesso!', results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/usuarios', async (req, res) => {
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM users;');
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/pets', async (req, res) => {
    console.log(req.body)
    const { 
      nome,
      sexo,
      idade,
      raca,
      especie 
     } = req.body;

    try {
        await db.connect();

        const sql = 'INSERT INTO pets (Tipo, Nome, Genero, Idade, Raca) VALUES (?, ?, ?, ?, ?)';
        const results = await db.query(sql, [especie, nome, sexo, idade, raca]);

        res.json({ message: 'Pet criado com sucesso!', results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.get('/pets', async (req, res) => {
    try {
        await db.connect();
        const results = await db.query('SELECT * FROM pets;');
        //await db.close();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});