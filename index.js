const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "books",
});

// connect to database
conn.connect((err) => {
    if (err) throw err;
    console.log("MySQL connected");
});

// creat a new Book Record
app.post("/api/BookCreate", (req, res) => {
    let data = { title: req.body.title, description: req.body.description, authorName: req.body.authorName, genre: req.body.genre};
    let sql = "INSERT INTO book SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("New Book Record is Added successfully" ));
    });
});

// creat a new Author Record
app.post("/api/AuthorCreate", (req, res) => {
    let data = { authorName: req.body.authorName};
    let sql = "INSERT INTO authors SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify( "New Author Record is Added successfully" ));
    });
});

// creat a new Genre Record
app.post("/api/GenreCreate", (req, res) => {
    let data = { genre: req.body.genre};
    let sql = "INSERT INTO genres SET ?";
    let query = conn.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("New Genre Record is Added successfully" ));
    });
});

// show records from book
app.get("/api/ShowAllBooks", (req, res) => {
    let sql = "SELECT * FROM book";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({result}));
    });
});

  

// show records from authors
app.get("/api/ShowAllAuthors", (req, res) => {
    let sql = "SELECT * FROM authors";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

// show records from genres
app.get("/api/ShowAllGenres", (req, res) => {
    let sql = "SELECT * FROM genres";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});



// attach book to genre
app.get("/api/Book&Genre", (req, res) => {
    let sql = "SELECT b.title, CONCAT(g.genreID, ' ', g.genre) AS genreInfo FROM book AS b JOIN genres AS g ON b.genre = g.genre";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});


// delete the book record
app.delete("/api/BookDelete/:id", function(req, res) {
    let sql = "DELETE FROM book WHERE bookID=" + req.params.id + "";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Book record deleted successfully" ));
    });
});

// delete the author record
app.delete("/api/AuthorDelete/:id", (req, res) => {
    let sql = "DELETE FROM authors WHERE authorID=" + req.params.id + "";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Author record deleted successfully"));
    });
});

// delete the book record
app.delete("/api/GenreDelete/:id", (req, res) => {
    let sql = "DELETE FROM genre WHERE genreID=" + req.params.id + "";
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Genre record deleted successfully"));
    });
});

// update the Record
app.put("/api/BookUpdate/", (req, res) => {
    let sql = "UPDATE book SET title='" + req.body.title + "', description='" + req.body.description + "', authorName='" + req.body.authorName + "', genre='" + req.body.genre + "' WHERE bookID=" + req.body.bookID;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Book record updated SuccessFully"));
    });
});

// update the Record
app.put("/api/AuthorUpdate/", (req, res) => {
    let sql = "UPDATE authors SET authorName='" + req.body.authorName + "' WHERE authorID=" + req.body.authorID;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Author record updated SuccessFully"));
    });
});

// update the Record
app.put("/api/GenreUpdate/", (req, res) => {
    let sql = "UPDATE genres SET genre='" + req.body.genre + "' WHERE genreID=" + req.body.genreID;
    let query = conn.query(sql, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify("Genre record updated SuccessFully"));
    });
});


app.listen(8081, () => {
    console.log("server started on port 8081...");
});




