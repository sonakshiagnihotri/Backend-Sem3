//let os=require('os')
// console.log(os.totalmem()/1024/1024/1024);
// console.log(os.freemem()/1024/1024/1024);
// console.log(os.cpus());
// console.log(os.arch());
// console.log(os.uptime()/3600);



// let http= require('http')

// let server= http.createServer((req,res)=>{
//     // //request KAHAN sse aarahi hai ki info dega
//     //console.log(req.url,'hehehh')
//     // res.end('hihihihihiiiii')
//     //res.write('byyyyebye')
//     //still waiting for more after write as write doesnt END
//     // res.end('mwahahah')

//     if(req.url=='/'){
//         res.end('heyheyheyyyy');
//     }
//     else if(req.url=='/about'){
//         res.end("abouttt")
//         //DAYUUUUUMMMM
//     }
    
// })
// server.listen(3000,()=>{
//     console.log('server ruuuuunnnning');
// })


let express= require('express')
let app= express()

// app.use((req,res,next)=>{
//     console.log('mai hun kooooon(not don)')
// })
// app.use((req,res,next)=>{
//     console.log('mai toh bilkul bhiiiii nahi jaane dunga')
// })
//yeh uppar wala bodyguard hai toh wont work

app.get('/',(req,res)=>{
    res.send('helllllllooooo server....')
})
app.post('/',(req,res)=>{
    res.send('post ki taraf se helllllllooooo server....')
})
app.post('/',(req,res)=>{
    res.send('post ki taraf se DUSRA helllllllooooo server....')
})

app.listen(3000,()=>{
    console.log('server is commmmiiiing...')
})


//amazon pe jao iphone search karo, data fetch hoke thumhe milega----.get 
//.post for sequrity even tho isse bhi we CAN fetch but HOW? for that you gotta connect it to frontend and for thaT HUMnw install karra THUNDER client 
//thunder clients a tool used to test backend ka code ki SAHI hai ya NaHI
