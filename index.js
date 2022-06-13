const express = require('express');
const app = express();
const db = require("./database/database.js")
const security = require("./lib/security.js")
var bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');

const HTTP_PORT = 4433;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.listen(HTTP_PORT, () => {
    console.log("Servidor escoltant a l'adreça http://localhost:" + HTTP_PORT)
})

app.get('/', (req, res) => {
    res.send('Resposta del servidor')
})

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    var sql = 'INSERT INTO users (username, password) VALUES ("'
        + username + '","' + password + '")'

    db.run(sql, function (err) {
        if (err) {
            console.log(err)
            res.status(400).send("Error trying to register.")
            return;
        }
        res.status(200).send("OK")
        return;
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    var sql = 'SELECT * FROM users WHERE username = "' + username + '"';
    db.get(sql, (err, user) => {
        if (err) {
            res.status(400).send("Error while login.")
        } else {
            if (user) {
                if (password === user['password']) {
                    res.status(200).send("Logged in")
                    return;
                } else {
                    res.status(403).send("Incorrect password")
                }
            } else {
                res.status(404).send("User does not exist")
            }
        }
    });
});