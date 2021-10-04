const express = require('express') 
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const createTable = `
    create table if not exists people (
        id int not null auto_increment,
        name varchar(250),
        primary key(id)
    )`
const sql = `INSERT INTO people(name) values('Ilivanilton')`

connection.query(createTable)
connection.query(sql)
connection.end()

app.get('/', (req,res) => {
    const sql = `select * from people`
    const conn = mysql.createConnection(config)
    conn.query(sql, (err, result) => {
        if(err) throw err
        let rtn = ""
        if(result){
            result.forEach(e =>{
                rtn += `<tr><td>${e.id}</td><td>${e.name}</td></tr>`
            });
            console.log("emtreou a",rtn)
        }
        res.send(
            `<h1>Full Cycle Rocks!</h1>
            <table><tr><th>ID</th><th>Nome</th></tr>
            ${rtn}
            </table>`
        );
    })
    conn.end()
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})