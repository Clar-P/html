/* 
    nodejs 文档 
    https://nodejs.dev/en/

    通过async 可以快速的创建异步函数
*/
function fn(){
    return Promise.resolve(10)
}

/* \
    通过async可以来创建一个异步函数
        异步函数的返回值会自动封装到一个Promise中返回
    
    在async 声明的异步函数中可以使用
*/
async function fn2(){
    return 10
}

// fn().then(r => {
//     console.log(r);
// })

// fn2().then(r => {
//     console.log(r);
// })

function sum(a,b){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(a + b)
        },2000)
    })
}


async function fn3(){
    sum(123,456).then(r => {
        console.log(r);
    })
}

fn3()