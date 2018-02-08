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

var Test = mongoose.model('Test', TestSchema);

module.exports = {Test};

// var state=mongoose.model('State',{
//     _id:{
//         type:Number
//     },
//     name:{
//         type:String,
//         require:true
//     }
// });

// module.exports = {State};
//
// var city=mongoose.model('City',{
//     stateid:{
//         type:Number,
//     },
//     name:{
//         type:String,
//     }
// });
// module.exports = {City};