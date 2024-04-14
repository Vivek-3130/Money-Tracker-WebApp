var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(bodyParser.json()); //to get things in json format
app.use(express.static("public")); //for rendering html,css,js
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/MoneyList");
var db = mongoose.connection;

db.on('error',()=>{
    console.log("Error in connecting to database");
})
db.on("open",()=>{
    console.log("Connected to database");
})

app.post("/add",(req,res)=>{
    var category_select = req.body.category_select;
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;

    var data = {
        "Category":category_select,
        "Amount":amount_input,
        "Info":info,
        "Date":date_input
    }

    db.collection("users").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Successfully Inserted");
    })
})


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":"*"
    });
    return res.redirect('index.html')
});

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT} `);
})