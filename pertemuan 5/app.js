const express = require (express);
const mysql = require(mysql);
const bodyParser = require(body-parser);
const { name } = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host:localhost,
    user: root,
    password: ``,
    database: pertemuan5
})

connection.connect((err)=>{
    if(err) {
        console.error("eror connecting to Mysql:", err.stack);
        return;
    }
    console.log("Mysql Connected" + connection.threadId);
});

app.set('view engine', 'ejs');

//ini adalaha routing (create, read, update, delete)
// READ (SELECT)
app.get('/', (req, res) => {
    const query = 'SELECT * FROM user';  // Bungkus query dalam tanda kutip
    connection.query(query, (err, result) =>{
        if(err) throw err;  // Tambahkan penanganan error
        res.render('index', {user: result}); // Pastikan 'index' juga dibungkus tanda kutip
    });
});

// CREATE (INSERT)
app.post('/add', (req, res) => {
    const { name, email, phone } = req.body;
    const query = 'INSERT INTO user (name, email, phone) VALUES (?, ?, ?)';  // Bungkus query dalam tanda kutip
    connection.query(query, [name, email, phone], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

// UPDATE
app.get('/edit/:id', (req, res) => {
    const query = 'SELECT * FROM user WHERE id = ?';  // Bungkus query dalam tanda kutip
    connection.query(query, [req.params.id], (err, result) => {
        if(err) throw err;
        res.render('edit', { user: result[0] });
    });
});

// UPDATE data
app.post('/update/:id', (req, res) => {
    const { name, email, phone } = req.body;
    const query = 'UPDATE user SET name = ?, email = ?, phone = ? WHERE id = ?';  // Bungkus query dalam tanda kutip
    connection.query(query, [name, email, phone, req.params.id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

// DELETE
app.get('/delete/:id', (req, res) => {
    const query = 'DELETE FROM user WHERE id = ?';  // Bungkus query dalam tanda kutip
    connection.query(query, [req.params.id], (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});
