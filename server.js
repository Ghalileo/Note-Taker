//Defined Variables with packages
const express = require("express");
const fs = require("fs");
const path = require("path");
//Empty array to store user input.
// variable which sets up express server
const app = express();
const memo = [];
//Variable for the port of the server
const PORT = process.env.PORT || 8080;
//Set up with express app in order to utilize data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(express.json());

//API Routes 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

//Express function which acquires data from saved notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        return res.json(JSON.parse(data));
    })
})
//Express function that saves notes
app.post("/api/notes", (req, res) => {
    req.body["id"] = memo.length + 1;
    let newMemo = JSON.stringify(req.body);
    memo.push(newMemo);
    fs.writeFile("./db/db.json", `[${memo}]`, "utf-8", (err) => {
        if (err) throw err;
        return res.json(req.body);
    })
})


//Express function which deletes the notes
app.delete("/api/notes/:id", (req,res) => {
    res.json({ ok: true});
});

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});



//Listen function which initates the server
app.listen(PORT, () => {
    console.log("You have succesfully connected to server at " + PORT);
})