const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");

const app = express();
app.use(
    bodyparser.urlencoded({
        extended:false
    })
);

app.use(bodyparser.json());

const db = require("./config/keys").mongoURI;
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log("Connected to db"))
.catch(err=>console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users",users);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server up and running on port ${port} `));