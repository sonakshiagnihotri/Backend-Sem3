let express= require("express");
let app= express();
let mongoose= require('mongoose')
let User= require('./db/db.js')
let jwt=require('jsonwebtoken')
app.use(express.json())
let bcryptjs = require('bcryptjs')

mongoose.connect("mongodb://127.0.0.1:27017/db").then(()=>{
    console.log('db.......')
    
})
//creating a database called db


// app.post('/',async(req,res)=>{
//     let {name,email,password} = req.body

//     let UserData= new User({
//         name,email,password
//     })
//     await UserData.save()
//     req.send(dooooone)
// })

app.post('/signUp', async(req,res)=>{
    let {name,email,password}= req.body
    let findData= await User.findOne({email})
    console.log(findData,"hehehahhah");

    if(findData){
        return res.send('user ZINDA HAI.....')
    }else{
        let updatedP= await bcryptjs.hash(password,10)
        console.log(updatedP,'dekhhhhhoooooo')

        let userInfo = new User({
            name,email,password:updatedP,
            role:role||'user'
        })

        await userInfo.save()
        res.send('dooooooone')
    }


})

app.post('/login',async(req,res)=>{
    let {email,password}=req.body

    let findData= await User.findOne({email})
    //to check existing email
    console.log(findData,'hehehah')

    let validP= await bcryptjs.compare(password,findData.password)
    if(!validP){
        return res.send("kyu nahi ho rahi padhai MWAAHHAHAH")
    }
    let token= jwt.sign({email:findData.email, role:findData.role},'mwahahah')
    console.log(token,'hehahah')
    res.json({msg:'done',token:token})

    // res.send("goodJobBrotha") useless
})


let auth=(req,res,next)=>{
    let token=req.headers.authorization;
    console.log(token,'tokennnn');

    if(!token){
        return res.send('kaun hain aap??????kyu hain aap?????')
    }
    let decode= jwt.verify(token,'mwahahah')
    console.log(decode,'isse');
    req.user=decode
    next();
}

app.get('/api',auth,(req,res)=>{
    res.send('heheheh')
})


app.listen(3000,()=>{
    console.log('serverrrr....')
    //confirming our server working
})
// app.get('/api',(req,res)=>{
//     if(admin)
// })

//'$2b$10$35Oed.o3fFhFkpmO6WfcjujiveFBBzkIt8h8lMw6IuJjU26NpdNDi'
//isme weve got 2b as the base model ig and then the 10 in between $ is the value then till 23 characters is the string


//TASK OOOOOOONE
// app.get('/me',async(req,res)=>{
//     req.user.id;
//     User.findById(req.user.id);
// })

app.get('/me',auth, async(req,res)=>{
    let id= req.user.id;
    let userData=await User.findById({id})
    let findData={
        name:userData.name,
        email:userData.email,
        role:userData.role
    }
    console.log(findData,'yayyy');
    res.send(findData);

})


//token
//jwt. decode
//users Id
//if exists, we'll send it
//or else we Wont 
//at the end of the day we js need the user id