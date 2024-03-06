const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors')
const app = express();
const port = 5000;

// Configuração do MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'crud'
});

// Conectar ao MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conectado ao MySQL');
});

// Middleware para o Body-parser
app.use(bodyParser.json());
app.use(cors())

// Rotas CRUD
// Create
app.post('/usuarios', (req, res) => {
  const { email, senha } = req.body;
  const sql = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
  db.query(sql, [email, senha], (err, result) => {
    if (err) throw err;
    res.send('Usuário criado com sucesso!');
  });
});

// Read
app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Update
app.put('/usuarios/:id', (req, res) => {
   
        const { email, senha } = req.body;
        const { id } = req.params;
        const sql = 'UPDATE usuarios SET email=?, senha=? WHERE id=?';
        db.query(sql, [email, senha, id], (err, result) => {
          if (err) throw err;
          res.send('Usuário atualizado com sucesso!');
        });
      
      
});

// Delete
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM usuarios WHERE id=?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Usuário excluído com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
