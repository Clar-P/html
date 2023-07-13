
/* 
    path
        -表示的是路径
        - 通过path可以用来获取各种路径
        - 要使用path。 需要先对其进行引入
        - 方法：
            path.resolve([...paths])
                -用来生成一个绝对路径
                    相对路径： ./xxx  ../xx  xxx
                    绝对路径：
                        -在计算机本地
                            c:\xxx
                            /User/xxx
                        -在网络中
                            http://www.xxxx/...
                            https://www.xxx/...
                    如果直接调用resolve。则返回当前的工作目录
                        c:\Users\86135\Desktop\跟练
                        - 注意：我们通过不同的方式执行代码时。他的工作目录是有可能发生变化的
                    
                    - 如果将一个相对路径作为参数，
                        则resolve会自动将其转换为绝对路径
                        此时根据工作目录的不同，他所产生的绝对路径也不同

                    - 一般会将一个绝对路径作为第一个参数，
                        一个相对路径作为第二个参数
                        这样他会自动计算出最终路径
*/

const path = require('node:path')

// const result = path.resolve()


// c:\Users\86135\Desktop\跟练\hello.js
// const result = path.resolve('./hello.js')


//最终形态
// 以后在使用路径时，尽量通过path.resolve() 来生成路径
// const result = path.resolve(__dirname,'./hello.js')
// console.log(result);



/* 
    fs (File System)
        -fs用来帮助node来操作磁盘中的文件
        - 文件操作也就是所谓的I/O， input output
        - 使用fs模块，同样需要引入
*/

// const fs = require("node:fs")

// readFileSync() 同步的读取文件的方法，会阻塞后边的代码的执行
// 当我们通过fs模块读取磁盘中的数据时，读取到的数据总会从Buffer对象的形式返回
// Beffer是一个临时用来存取数据的缓冲区
// const buf = fs.readFileSync(path.resolve(__dirname,'./hello.txt'))
// console.log(buf.toString()); 

//fs.readFile() 异步的读取文件的方法
// fs.readFile(
//     path.resolve(__dirname,'./hello.txt'),
//     (err,buffer) => {
//         if(err){
//             console.log('出错了');
//         }else{
//             console.log(buffer.toString());
//         }
//     }
// )

const fs = require("node:fs/promises")
const {buffer} = require("stream/consumers")

/* 
    Promise版本的fs的方法
*/
// fs.readFile(path.resolve(__dirname,"./hello.txt"))
//     .then(buffer => {
//         console.log(buffer.toString());
//     })
//     .catch(e => {
//         console.log("出错了");
//     })


;(async () => {
    try{
        const buffer = await fs.readFile(path.resolve(__dirname,'./hello.txt'))
        console.log(buffer.toString());
    }catch(e){
        console.log('出错了');
    }
})()