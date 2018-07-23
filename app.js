const express = require("express");
const hbs = require("hbs");
const fs = require("fs")
var app = express();
var port = process.env.PORT || 3000;



app.set("view engine", "hbs");
app.use(express.static(`${__dirname}/public`))
hbs.registerPartials(`${__dirname}/views/partials`);


hbs.registerHelper("year", ()=> {
   return new Date().getFullYear()
});



//app.use((req, res, next) => {
//    res.render("maintenance.hbs")
//})






app.use((req , res , next) => {
    var log = new Date().toString() + " : " + req.method + " " + req.url;
    console.log(log);
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log("Unable to append file")
        }
    })
    next();
});


app.get("/", (req, res) => {
    res.render("home.hbs", {
        pageTitle : "Home page" ,
        welcomeMessage : "Welcome to this website !",
    })
});

app.get("/bad", (req, res) => {
    res.send({
        errorMessage: "Something went wrong !"
    })
});

app.get("/about", (req, res) => {

    res.render("about.hbs", {
        pageTitle : "About Page",
    })
});


app.listen(port , () => {
    console.log("Server is running on 3000")
});
