let mongoose= require('mongoose');

let userSchema = new mongoose.Schema({
    // id:'Number',
    name:'String',
    email:'String',
    passWord:'String',
    role:{
        type:String,
        emun:['user','admin'],
        default:'user'
    }
})

let User=mongoose.model('user',userSchema)
//to be able to send the data from here to app.js
module.exports=User
//sending user data to app.js