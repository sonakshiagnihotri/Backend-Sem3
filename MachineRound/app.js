let express=require('express')
let app=express()
app.use(express.json())
let mongoose=require('mongoose')
let User=require('./db')
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
// const { data } = require('react-router-dom')
mongoose.connect('mongodb://127.0.0.1:27017/sonakshisDb').then(()=>{
    console.log('yayDb')
})
app.get('/',(req,res)=>{
    res.send('hihihihiiiii')
})

app.post('/signUp',async(req,res)=>{
    let data= req.body;
    console.log(data,'users infooo')
    let findData= await User.findOne({email:data.email})
    console.log(findData,'heheehehe')

    if(findData){
        return res.send("yayyyy user zinda haiiii🐙")
    }
    let hashedP= await bcrypt.hash(data.passWord,8)
    console.log(hashedP,'yayyy the password is hashed noooow')

    let userData= new User({
        name:data.name,
        email:data.email,
        passWord:hashedP,
        // role:role || 'user'
    })
    await userData.save()
    res.send('mwahahah done')
        
})

app.post('/login',async (req,res)=>{
    let {email,passWord}=req.body;
    let findUser=await User.findOne({email})
    if(findUser){
        let validP= await bcrypt.compare(passWord,findUser.passWord);
        if(!validP){
            return res.send('kyu nahi ho rahi padhai🐽')
        }
        //id cardddd
        let token= jwt.sign({
            email:findUser.email,
            id:findUser._id
            
            // role:findUser.role || 'user'
        
        },'oursecret'
        
    )
        // console.log(id)
        //HOOOOOOOOOOOOOOOOOOW DO I DO THIIIIIIIIIIS
        console.log(token,'yay our token')
        res.json({msg:'doooone', token: token})
    }else{
        return res.send('signUp karke aaoooo')
    }
})
let auth=(req,res,next)=>{
    // let token=req.headers.myOwnHeader
    let token=req.headers.myownheader
    // let token=req.headers.authorization
    console.log(token,'yay weve got the token')

    if(!token){
        return res.send('kaaaaun hain aap- signUp karke aao')
    }
    let decode=jwt.verify(token,'oursecret')
    console.log(decode,'yayyy weve verified the token too now')
    req.User=decode
    //???? why
    next()
    //allowance by the security guards
}
app.get('/api',auth,(req,res)=>{
    res.send('done')
})

//TASK OOOOOONE
// TASK 1 — My Profile API
// Create GET /me for a logged-in user.
// The JWT already contains the user's userId. Use the authenticated user's identity to fetch the user from
// MongoDB.
// • Do not accept an email/userId from the request body or query.
// • Return the user's name, email and role.
// • Never return the password field.
// • Unauthenticated requests must not access the route.
// Think: How can req.user help you identify exactly who is logged in?

app.get('/me',auth,async(req,res)=>{
    // let data=req.body;
    //checking if user is loggedin
    //how? by adding the middleware auth
    let id= req.user.id
    let findUser=await User.findById(id)
    let userData={
        name:findUser.name,
        email:findUser.email,
        role:findUser.role ||'user'
    }
    console.log(userData,'yay?')
    res.send(userData)
})

// TASK 2 — Update Only Your Own Profile
// Create PUT /me.
// A logged-in user can update only their own name.
// • The user must be authenticated with JWT.
// • Do not allow the client to change role, email or password through this API.
// • Save the updated name in MongoDB and return the updated user without the password.
// • If the request tries to send role/email/password, ignore or reject those fields.
// Test case: A normal user must never be able to turn themselves into an admin by sending {"role":"admin"}.



// TASK 3 — Admin: Change Another User's Role
// Create PATCH /users/:id/role.
// Only an admin can use this API.
// • JWT authentication is required.
// • Use your role-check middleware.
// • Take the target user's ID from the URL.
// • Allow the admin to change the target user's role between user and admin.
// • Handle invalid/non-existing user IDs properly.
// • A normal user must receive an access-denied response.
// Important: The role being changed belongs to the target user, not the person making the request.



// TASK 4 — My Orders / Data Ownership
// Create an Order model with at least: productName, amount, userId.
// Create POST /orders for authenticated users.
// • userId must come from the verified JWT, not from the request body.
// • Create GET /my-orders that returns only the logged-in user's orders.
// • User A must never receive User B's orders.
// • Do not allow the client to choose another user's userId.
// Challenge: If the body contains {"userId":"someoneElse"}, your API should still save the order against the
// authenticated user's ID.



// TASK 5 — Debug the Broken API
// You are given a working-looking API, but it has security/logic bugs. Find and fix at least 5 problems.
// app.get('/users/:id', auth, async (req,res) => {
// let user = await User.findById(req.params.id);
// res.json(user);
// });
// app.put('/role', auth, async (req,res) => {
// let {role} = req.body;
// req.user.role = role;
// res.send('updated');
// });
// app.get('/my-orders', auth, async (req,res) => {
// let orders = await Order.find();
// res.json(orders);
// });


app.listen(3500,()=>{
    console.log("serverrr...");
    
})