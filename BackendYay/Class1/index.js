const fs=require('fs')
// fs.writeFileSync('index.html','heyyyyy')
// fs.writeFileSync('index.txt','heyyyyy')
// let data=fs.readFileSync('index.txt')
// console.log(data.toString(),'heheheheheh')


//ASYNCHRONOUS
// console.log('1')
// fs.writeFile('home.txt','hihiiiiii',()=>{
//     console.log("mai run ho chuka hunnnnnnnn")
// })
// console.log('2')
// console.log('3')
// console.log('A')


//SYNCHRONOUS - if our writeFile wala part takes an hour to run D will be printe4d very late and will be wating for an hour
// setTimeout(()=>{
//     console.log('A')
// },1000)
// console.log('B')
// let p=new Promise(()=>{
//     console.log('C')
// })
// fs.writeFileSync('home.txt','hihiiiiii',()=>{
//     console.log("mai run ho chuka hunnnnnnnn")
// })
// console.log('D')


// // fs.appendFile
// // fs.unlink

//CREATE FOLDER
// fs.mkdirSync("mwahahahah")

fs.writeFileSync('mwahahahah/new.txt',"heheheheheheh")
console.log('1')
fs.writeFile('home.txt','okaybrotha',()=>{
    console.log("done")
})

fs.writeFileSync('new.txt')
console.log(data.toString());
fs.unlinkSync('new.txt')
fs.rmdirSync()


