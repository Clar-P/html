const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")

let STUDENT_ARR = require("./data/students.json")

let name = "猪八戒"


app.set("view engine", "ejs")

app.set("views", path.resolve(__dirname,"views"))

app.use(express.static(path.resolve(__dirname,"public")))

app.use(express.urlencoded())

app.post("/update-student",(req,res) => {
    
    const {id,name, age, gender, address} = req.body

   
    const student = STUDENT_ARR.find(item => item.id == id)

    student.name = name
    student.age = age
    student.gender = gender
    student.address = address
    
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        
        res.redirect("/students")
    }).catch(() => {
        
    })
    
})

app.get("/to-update",(req,res) => {
    const id = +req.query.id
    
    const student = STUDENT_ARR.find(item => item.id === id)

    console.log(student);
    res.render("update",{student})
})

app.get("/delete", (req,res) => {
    
    const id = +req.query.id
    
    STUDENT_ARR = STUDENT_ARR.filter((stu) => stu.id !== id)
    
    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        
        res.redirect("/students")
    }).catch(() => {
        
    })
})


app.get("/hello",(req,res) => {
    res.send("hello")
})

app.get("/students",(req,res) => {
    res.render("students", {stus:STUDENT_ARR})
})


app.post("/add-student",(req,res) => {
    const id = STUDENT_ARR.at(-1) ? STUDENT_ARR.at(-1).id + 1 : 1

    const newUser = {
        id,
        name:req.body.name,
        age:+req.body.age,
        gender:req.body.gender,
        address:req.body.address
    }

    STUDENT_ARR.push(newUser)


    fs.writeFile(
        path.resolve(__dirname, "./data/students.json"),
        JSON.stringify(STUDENT_ARR)
    ).then(() => {
        
        res.redirect("/students")
    }).catch(() => {
        
    })

    
})



app.use((req,res) => {
   
    res.status(404)
    res.send("<h1>您访问的地址已被外星人劫持</h1>")
})

app.listen(3000, ()=> {
    console.log('服务器已经启动！');
})