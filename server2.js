var express= require('express');
var app= express();

var bodyParser= require('body-parser');
var Test =require('./models/test2').Test;

var state =require('./models/test2').mystate;
var City=require('./models/test2').City;
//var cors = require('cors');
const mongoose=require('./config/conn');

//----routes

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use((req,res,next) =>{
//
//     res.header('Access-Control-Allow-Origin',' http://localhost:3001');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//
//     next();
// });
//app.use(cors());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',' http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    res.header(`Access-Control-Allow-Methods`, `POST`);
    res.header(`Access-Control-Allow-Methods`, `DELETE`);
    res.header(`Access-Control-Allow-Methods`, `PATCH`);
    res.header(`Access-Control-Expose-Headers`, `x-auth`);
    next();
});

app.get('/list',(req,res)=>{
    console.log("In List");
    Test.find().then((data)=>{
        console.log("List :: ",data);
        res.send(data);
    }).catch((err)=>{
        console.log("Error while fetching");
    });

});
app.get('/citylist',(req,res)=>{
    console.log("In List");
    City.find().then((data)=>{
        console.log("List :: ",data);
        res.send(data);
    }).catch((err)=>{
        console.log("Error while fetching");
    });

});
app.post('/addstate',(req,res)=>{

    var newstate = new state({
        name:req.body.name
    });

    newstate.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });

});
app.post('/addcity',(req,res)=>{

    var city = new City({
        stateid:req.body.id,
        name:req.body.name
    });

    city.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });

});
app.post('/add',(req,res)=>{

    res.send(req.body);
    let test = new Test();

    test.fname=req.body.fname;
    test.lname=req.body.lname;
    test.state=req.body.state;
    test.city=req.body.city;
    test.email=req.body.email;

    test.save().then((doc) => {
        console.log(doc);
        res.send(doc);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });

});
app.post('/edit/:id',(req,res)=>{
    console.log(req.body);
    Test.findById(req.params.id).then((data) => {

        data.fname=req.body.fname;
        data.lname=req.body.lname;
        data.state=req.body.state;
        data.city=req.body.city;
        data.email=req.body.email;

        data.save().then((doc) => {
            console.log(doc);
            res.send("Updated  " + doc);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }).catch((e) => {
    })});
app.post('/del',(req,res)=>{
    var id=req.body.id;
    console.log("id ",id);
    Test.remove({_id:id}).then((data)=>{
        console.log(data);
        console.log("Deleted ");
    }).catch((e)=>{});
});
app.get('/getstate',(req,res)=> {
    state.find({}).then((state)=>{
        res.send(state);})
        .catch((err)=>{
        console.log(err);

    });
});

app.get('/getcity/:sid',(req,res)=>{



            City.find({stateid:req.params.sid})
                .then((citynm)=>{
                res.send(citynm);
            }).catch((err)=>{
                console.log("error"+err);
            });


});
app.get('/sortfetch',(req,res)=> {
    Test.find({}).sort({fname:1}).then((user)=>{
        console.log(user);
        res.send(user);
    }).catch((err)=>{
        if(err) throw error;
    })
});

app.listen(2222,()=>{
    console.log('Server is up .');
});