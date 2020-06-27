const express = require('express')
const app = express()
var port = process.env.PORT || 80
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/guide',(req,res)=>{
    res.render('guide');
})
app.get('/search', (req, res) => {
    var response=[];
    function search(name,centre,stream) {
        name=name.toLowerCase();
        var data=require('./data/'+centre+' '+stream);
        for(var i=0;i<data.length;i++)
        {
            var check=data[i].name.toLowerCase();
            if(check.includes(name))
            {
                var obj={
                    "name":data[i].name,
                    "roll":data[i].roll
                }
                response.push(obj);
            }
        }
    }
    search(req.query.query,req.query.centre,req.query.stream);
    res.render('results',{response:response,queries:req.query});
})

app.listen(port);