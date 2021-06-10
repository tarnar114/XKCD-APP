const Router= require('express').Router();
const fetch=require('node-fetch');
/*entry point for the app, what it will do is that when app is accessed, it will automatically look 
for the latest comic and when it does, it will redirect you to the most up to date comic and the url
will change to /:${most up to date comics num here}
*/
Router.get('/',async(req,res)=>{
    /*entry point for app, whenever someone enters the app it will get the latest comic and get the latest comic number and redirect the url to the /{latest comic num} route */
    const url_api='http://xkcd.com/info.0.json';
    try {
        await fetch(url_api)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            // res.send({express:data})
            res.redirect(`/${data.num}`)
        });

    } catch (err) {
        console.log(err);
    }
    
});
Router.get('/:num',async(req,res)=>{
    /*the main routing for the whole app this will get the num url parameter and render the assosciated comic based on the url parameter
    then it will put all necessary data into a  JSON object and finally render the handlebars main page with the obj JSON object
    if there is an error (like if they enter a string for url parameters or they go and add a comic num that doesnt exist it will
        restrict them from going to that url and redirect them back)*/
    const url_api=`http://xkcd.com/${req.params.num}/info.0.json`
    try {
        await fetch(url_api)
        .then(res=>res.json())
        .then((data)=>{
            console.log(data);
            // res.send({express:data})
            // if (this.data.transcript!=='') {
            //     transcript:data.transcript
            // }
            const obj={
                Img:data.img,
                title:data.title,
                month:data.month,
                year:data.year,
                transcript:data.transcript
            }
            res.render('home',obj);
        })
    } catch (err) {
        console.log(err)
        res.redirect('back');
    }
})
Router.post('/:num',async (req,res)=>{
    /*post req handler it will first read the body of the button that submitted to the route page and conditionally redirect to the get route for /${num} and that 
    redirect will redirect it based on the button clicked(ex:left button will make it go to the prev comic) */
    console.log(req.params.num)
    console.log(req.body.class)
    if (req.body.left){
        console.log('left')
    // console.log(parseInt(req.params.num)-1)
    res.redirect(`/${parseInt(req.params.num)-1}`)
    }
    else if(req.body.right){
        console.log('right')
        // console.log(parseInt(req.params.num)+1)   
        res.redirect(`/${parseInt(req.params.num)+1}`)
    }
    else if(req.body.latest){
        console.log('latest')
        res.redirect('/')
    }
    else if(req.body.random){
        console.log('random')
        const url_api='http://xkcd.com/info.0.json';
        try {
            await fetch(url_api)
            .then(res=>res.json())
            .then((data)=>{
               var Random=Math.floor((Math.random()*data.num)+1);
               console.log(Random);
               res.redirect(`/${Random}`);
            })
        } catch (err) {
            console.log(err)
            res.redirect('back');
        }
    }
    else {
        console.log('else')
        res.redirect('/1')
    }
})



module.exports=Router;