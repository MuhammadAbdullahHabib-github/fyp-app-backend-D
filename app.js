const express = require('express');
const db = require('./database/ mongo');
const cors = require("cors")
const app = express();

db();
app.use(cors()) // add cors headers
app.use(express.json()) // parse json bodies
app.use(express.urlencoded({extended: true})) // parse form data


//Defining Routes here
app.use('/api/auth',require('./routes/auth'))
app.use('/api/admin',require('./routes/admin'))
app.use('/api/faculty',require('./routes/faculty'))



throw new TypeError('Router.use() requires a middleware function but got a ' + gettype(fn))
app.get("/", (req, res) => {
    res.send("Express Server is Up and Running ...")
})


// APP LISTENER / START THE SERVER
app.listen(4000, () => console.log("SERVER STATUS", `Listening on port 4000`))
