const express = require("express")
const app = express()
const path = require("path")

/* 
    配置静态资源的路径
    public 等价于  http://localhost:3000
*/
app.use(express.static(path.resolve(__dirname,'public')))

// 引入解析请求体的中间件
app.use(express.urlencoded())

// 添加一个路由，可以读取get请求的参数
//  /login  -->  http://localhost:3000/login  (以 / 开头的是绝对路径 ， / 表示的是根目录)
app.get("/login",(req,res) => {
    // 获取用户发送的数据
    // 通过req.query 来获取查询字符串中的数据(在url栏中传递)
    if(req.query.username === "admin"  && req.query.password === "123123"){
        res.send("<h1>欢迎您回来，登录成功</h1>")
    }else{
        res.send("<h1>您的密码输入错误</h1>")
    }
})

app.post("/login", (req,res) => {
    // 通过req.body来获取post请求的参数（请求体中的参数）（通过请求体传递）
    // 默认情况下 express不会自动解析请求体，需要通过中间件来为其增加功能
    // console.log(req.body);

    const username = req.body.username
    const password = req.body.password

    if(username === "admin" && password === "123123"){
        res.send("<h1>登录成功</h1>")
    }else{
        res.send("<h1>登录失败</h1>")
    }

    // res.send("<h1>post请求已经收到</h1>")
})

// get 请求发送参数的第二种方式
//  /hello/:id 表示的是当用户访问 /hello/xxx 时就会触发
// 在路径中以冒号命名的部分我们称为param，在get请求中他可以被解析为请求参数
// param 传参一般不会传递特别复杂的参数
app.get("/hello/:id",(req,res) => {
    // 约定优于配置

    // 可以通过req.params 属性来获取这些参数
    console.log(req.params);
    res.send("<h1>这是hello路由</h1>")
})

app.listen(3000,() => {
    console.log('服务器已经启动');
})