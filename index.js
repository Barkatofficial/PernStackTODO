const express = require("express");
const app = express();
const cors =require('cors');
const todo = require('./routes/todos_route');
const user = require('./routes/users_route');


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//
app.use('/todos',todo);
app.use('/user',user);



app.listen(5000 , () => {
    console.log('server started at 5000 port')
})