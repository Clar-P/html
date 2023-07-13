const express = require("express")
const path = require("path")
const app = express()
const cookieParser = require("cookie-parser")
const session = require("express-session")

// 引入file-store
const FileStore = require("session-file-store")(session)

const userRouter = require("./routes/user")
const goodsRouter = require("./routes/goods")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname,"views"))

app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded())
app.use(cookieParser())
app.use(
    session({
        store: new FileStore({
            path:path.resolve(__dirname,"./sessions")
            
        }),
        secret:"dazhaxie",
        
    })
)

/* 
    session是服务器中的一个对象。这个对象用来存储用户的信息
        每一个session都会有一个唯一的id。session创建后，
            id会以cookie的形式发送给浏览器
        浏览器收到以后，每次访问都会将id发回，服务器中就可以根据id找到对应的session
    
    id（cookie） --> session对象

    session什么时候会失效
        第一种 浏览器的cookie没了
        第二种 服务器中的session对象没了
        
    express-session ，默认是将session存储到内存中，所以服务器一旦重启session会自动重置
        所以我们使用session时通常会对session进行一个持久化的操作，（写到文件或数据库）

    如果将session存储到本地文件中：
        - 需要引入一个中间件session-file-store
        - 使用步骤：    
            ① 安装
                npm i session-file-store
                yarn add session-file-store
            ② 引入
                const FileStore = require("session-file-store")(session)
            ③ 设置为中间件
            app.use(
                session({
                    store:new FileStore({}),
                    secret:"dazhaxie"
                })
            )
*/

app.use("/students",require("./routes/student"))


app.get("/",(req,res) => {
    res.render("login")
})

app.get("/logout",(req,res) => {
    //使session失效
    req.session.destroy(() => {
        res.redirect("/")
    })
    
})

app.post("/login",(req,res) => {
   // 获取用户的用户名和密码
    const {username,password} = req.body
    if(username === "admin" && password === "123123"){
        // 登录成功后，将用户信息放入到session中
        // 这里仅仅是将loginUser添加到了内存中的session中
        // 而没有将值写入到文件中
        req.session.loginUser = username

        // 为了使得session可以立刻存储。需要手动调用save
        req.session.save(() => {
            res.redirect("/students/list")
        })

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