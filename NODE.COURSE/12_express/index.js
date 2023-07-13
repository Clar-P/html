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

/* 
// Router 是express中创建的对象
const router = express.Router()
// router 实际上是一个中间件，可以在该中间件上去绑定各种路由以及其他中间件
router.get("/hello",(req,res) => {
    res.send("Hello Router!")
})
app.use(router) 
*/

// 使路由生效
// 在router前加上文件路径，可以防止因两个文件内路由同名的问题，两个文件里都可以有叫list的路由
//app.use("/user",userRouter)
//app.use("/goods",goodsRouter)

app.use("/students",require("./routes/student"))


app.get("/",(req,res) => {
    res.render("login")
})

app.get("/get-cookie",(req,res) => {
    
    
    // 给客户端发送一个cookie
    res.cookie("username","admin")

    res.send("cookie已经发送")
})

app.get("/hello",(req,res) => {
    /* 
        需要安装中间件来使得express可以解析cookie
            1，安装 cookie-parser
                npm i cookie-parser
            2,引入
                const cookieParser = require("cookie-parser")
            3,设置为中间件
                app.use(cookieParser())
    */
    // req.cookies 用来读取客户端发回的cookie
    console.log(req.cookies)

    res.send("hello路由")
})




app.post("/login",(req,res) => {
    /* 
        现在咱们这个登录，简直形同虚设
            HTTP协议是一个无状态的协议，    
                服务器无法区分请求是否发送自同一个客户端 
            
            cookie
                - cookie是HTTP协议中用来解决无状态问题的技术
                - cookie的本质就是一个头
                    - 服务器以响应头的形式将cookie发动给客户端
                        客户端收到以后将其存储，并在下次向服务器发送请求时将其传回
                        这样服务器就可以根据cookie来识别出客户端了
    */
    // 获取影虎输入的用户名和密码
    const {username,password} = req.body
    if(username === "admin" && password === "123123"){
        // 登录成功
        // res.send("登录成功")
        // 将用户名放入cookie
        res.cookie("username",username)
        res.redirect("/students/list")
    }else{
        res.send("用户名或密码错误")
    }
})


app.use((req,res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持了</h1>")
})

app.listen(3000, ()=> {
    console.log('服务器已经启动！');
})