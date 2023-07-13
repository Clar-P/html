const express = require("express")
const path = require("path")
const app = express()

// 引入session
const session = require("express-session")

app.set("view engine", "ejs")
app.set("views", path.resolve(__dirname,"views"))

app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded())

// 设置session中间件
app.use(session({
    secret:"hello"
}))

app.get("/set",(req,res) => {
    /* 
        cookie 的不足
            - cookie 是由服务器创建，浏览器保存
                每次浏览器访问服务器时都需要将cookie返回
                这就导致我们不能在cookie中存放较多的数据
                并且cookie是直接存储在客户端的，容易被篡改盗用
            - 注意：
                我们在使用cookie时一定不会在cookie中存储敏感数据

            - 所以为了cookie的不足，我们希望可以这样
                将用户的数据统一存储在服务器中
                    每一个用户的数据都有一个对应的id
                    我们只需要通过cookie将id发送给浏览器
                    浏览器只需要每次访问的时候将id发回，即可读取到服务器中存储的数据
                    这个技术我们称之为session（会话）

        sesssion
            - session是服务器中的一个对象，这个对象用来存储用户的数据
            - 每一个session对象都有一个唯一的id，id会通过cookie的形式发送给客户端
            - 客户端每次访问时只需将存储有id的cookie发回即可获取他在服务器中存储的数据
            - 在express 中可以通过express-session 组件来实现session功能
            - 使用步骤：
                1，安装
                    npm i express-session
                    yarn add express-session
                2,引入
                    const session = require("...")
                3.设置为中间件
                    app.use(session({...}))
    
    */
   
    //console.log(req.session);
    req.session.username = "sunwukong"  

    res.send("查看session")
})

app.get("/get",(req,res) => {
    const username = req.session.username
    res.send("读取session")

    console.log(username);
})



app.use((req,res) => {
    res.status(404).send("<h1>您访问的页面已经被外星人劫持了</h1>")
})

app.listen(3000, ()=> {
    console.log('服务器已经启动！');
})