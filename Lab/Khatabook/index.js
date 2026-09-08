let express= require('express');
let app= express();

const fs=require('fs')
//fs-filesystem

app.set('view engine','ejs')


app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        if(err) return res.status(500).res.send(err)
    res.render('index')
    })
 
})


app.listen(3000,()=>{
    console.log('listeningggg....');
    }
)