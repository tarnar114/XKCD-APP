const express=require('express');
const app=express();
const exphbs = require('express-handlebars');
app.set('view engine', 'handlebars');

const PORT=process.env.PORT || 5000;
//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

const routes=require('./routes/Routes');
app.use('/',routes);

// const cors = require("cors")
// app.use(cors())

app.listen(PORT,()=>console.log(`server running at port ${PORT}`));
