const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
// const userRouter = require("./routers/user")
// const goodsRouter = require("./routers/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname,"views"))
app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded())
app.use(cookieParser())

app.get("/set",(req,res) => {

    /* 
        cookie是有有效期的
            - 默认情况下cookie的有效期就是一次会话（session）
                - 一次会话就是浏览器从打开到关闭的过程
            -maxAge 用来设置cookie有效时间，单位是毫秒
    
    */
    res.cookie("name","sunwukong",{
        //expires:new Date(2022,11,7)
        maxAge:1000 * 60 * 60 * 24 * 30
    })
    res.send("设置cookie")
})

app.get("/get",(req,res) => {
    const name = req.cookies.name
    console.log(name);
    res.send("读取cookie")
})

app.get("/delete-cookie",(req,res) => {
    // cookie 一旦发送给浏览器我们就不能再修改了
    // 但是我们可以通过发送新的同名cookie 来替换旧cookie,从而达到修改的目的

    res.cookie("name","",{
        maxAge:0
    })
    res.send("删除")
})

app.use((req,res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持了</h1>")
})

app.listen(3000, ()=> {
    console.log('服务器已经启动！');
})