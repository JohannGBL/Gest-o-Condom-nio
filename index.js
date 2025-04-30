const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importe o módulo 'path' para lidar com caminhos de arquivos

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Trocar pelo seu usuário do MySQL
    password: 'root', // Trocar pela sua senha do MySQL
    database: 'GestaoDeCondominios',
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados!');
    }
});

// Rota principal que serve o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Usando path.join para garantir o caminho correto
});
app.get('./blocos/pesquisaBlocos.html', function(req,res){
    const listar = "SELECT * FROM bloco";

    db.query(listar, function(err, rows){
        if(!err){
            console.log("Consulta realizada com sucesso!");
            res.send(`
                <html>
                <head>
                <title> Relatório de estoque </title>
                </head>
                <body>
                <style>/* style.css */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --light-color: #ecf0f1;
    --dark-color: #2c3e50;
    --success-color: #2ecc71;
    --border-radius: 8px;
    --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    background-color: #f5f7fa;
    color: var(--dark-color);
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 30px;
    text-align: center;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--secondary-color);
}

/* Estilos da Tabela */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 30px 0;
    background-color: white;
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    overflow: hidden;
}

th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: var(--primary-color);
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.9rem;
}

tr:nth-child(even) {
    background-color: #f8f9fa;
}

tr:hover {
    background-color: #f1f1f1;
}

/* Destaques para dados importantes */
td:nth-child(4) { /* Coluna de preço */
    color: var(--accent-color);
    font-weight: bold;
}

td:nth-child(5) { /* Coluna de vagas */
    font-weight: bold;
}

/* Botão/Link Voltar */
.back-link {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 25px;
    background-color: var(--secondary-color);
    color: white;
    text-decoration: none;
    border-radius: var(--border-radius);
    font-weight: bold;
    transition: all 0.3s ease;
}

.back-link:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsividade */
@media (max-width: 768px) {
    body {
        padding: 10px;
    }
    
    h1 {
        font-size: 1.8rem;
    }
    
    table {
        display: block;
        overflow-x: auto;
    }
    
    th, td {
        padding: 10px;
        font-size: 0.9rem;
    }
}

/* Efeitos para poucas vagas */
.low-vacancy {
    color: var(--accent-color);
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.6; }
    100% { opacity: 1; }
} </style>

saaaaaaaaaaaaa
                </body>
                </html>
                `);
        } else {
            console.log("Erro no relatório de estoque ", err);
            res.send("Erro")
        }
    })
});

// Inicia o servidor
app.listen(3001, () => {
    console.log('Servidor rodando na porta http://localhost:3001');
});