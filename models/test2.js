
const mongoose = require('mongoose');
const validator = require('validator');

var TestSchema=new mongoose.Schema({
    fname:{
        type: String,
        trim: true,

    },
    lname:{
        type: String,
        trim: true,

    },
    state:{
        type: String,
        trim: true,

    },
    city:{
        type: String,
        trim: true,

    },
    email: {
        type: String,
        trim: true,
    },
});
var StateSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true,
        trim: true,
    }
});
var CitySchema=new mongoose.Schema({
    stateid:{
        type:String,
     },
     name:{
        type:String,
         trim: true,
    }
});
var City= mongoose.model('City', CitySchema);
//module.exports = {City};
var mystate= mongoose.model('state', StateSchema);
//module.exports = {mystate};
var Test = mongoose.model('Test', TestSchema);
module.exports = {Test,mystate,City};

