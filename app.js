const express=require('express');
const app=express();
const exphbs = require('express-handlebars');
app.set('view engine', 'handlebars');
//port config
const PORT=process.env.PORT || 5000;
//Sets handlebars configurations 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//set app so it is able to use JSON data and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
//sets entry point for app and also routing for whole app
const routes=require('./routes/Routes');
app.use('/',routes);

// const cors = require("cors")
// app.use(cors())

app.listen(PORT,()=>console.log(`server running at port ${PORT}`));
/*Thanks for considering me as a participant for the case study, below are some improvements i wanted to do:
1. make a more user friendly UI and experience. Configure the CSS more, have it send alerts instead of redirecting you
2.not sure if this counts but im still not sure if my method for fetching the API in the routes page was the best practice,i will have to study that more
3.i wanted to implement the viewed counter for the pages using google analytics but didnt have time and it was kind of confusing to me

all in all thank you for granting me this chance to showcase my skills
Thanks, 
Tanzir
*/