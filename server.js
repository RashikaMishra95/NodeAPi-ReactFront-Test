var express= require('express');
var app= express();

var bodyParser= require('body-parser');
var Test =require('./models/test').Test;
var State =require('./models/test').State;
var City=require('./models/test').City;
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

app.post('/add',(req,res)=>{

    res.send(req.body);
    let test = new Test();      // create a new instance of the Product model

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
    state.find({}).then((state)=>{res.send(state);}).catch((err)=>{
        console.log(err);
    });
});
// app.get('/cityfetch/:nm',(req,res)=> {
//     var msg=req.params.nm;
//     console.log(msg);
//     if(msg!="Select State"){
//         state.find({name:msg},(err, user)=> {
//             if (err) throw error;
//             city.find({stateid:user[0]._id}, (err, user) => {
//                 if (err) throw error;
//                 console.log(user)
//                 res.send(user);
//             });
//         })
//     }
// });
app.get('/getcity/:city',(req,res)=>{
    var city1=req.params.city;
    console.log(city1);
    if(city1!="Select State"){
        state.find({name:city1}).then((city)=>{
            city.find({stateid:city[0]._id}).then((data)=>{
                res.send(data);
            }).catch((err)=>{
                console.log("error"+err);
            });
        }).catch();
    }
});
app.listen(2222,()=>{
    console.log('Server is up .');
});