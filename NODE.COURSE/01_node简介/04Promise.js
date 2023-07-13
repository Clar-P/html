// Promise就是一个用来存储数据的对象
// 但是由于Promise存取的方式的特殊，所以可以直接将异步调用的结果存储到Promise中
// 对Promise进行链式调用时
//    后面的方法（then 和catch） 读取的上一步的执行结果
//        如果上一步的执行结果不是当前想要的结果,则跳过当前的方法

/* 
    当Promise出现异常时，而整个调用链中没有出现catch，则异常会向外抛出
*/

const promise = new Promise((resolve,reject) => {
    reject('周一到周五不见不散')
})

promise
    .then(r => console.log('第一个then',r))
    .catch(r =>{ 
        throw new Error('报个错玩')
        console.log('异常处理r',r)
        return '嘻嘻'
    })
    .catch(result => console.log(result))
    
    .then(r => console.log('第二个then',r))

/* 
    promise中的
        then (return new Promise)
        catch
        -这三个方法都会返回一个新的Promise,
            Promise中会存储回调函数的返回值
        finally
            -finally 的返回值，不会存储到新的Promise中
*/
/*
const p2 = promise.then(result => {
    console.log('回调函数', result);
    return '锄禾日当午'
})
// setTimeout(() => {
//     console.log(p2);
// },1000)

const p3 = p2.then(result => {
    console.log(result);
    return '飞流直下三千尺'
})

p3.then(result => {
    console.log(result);
}) 

*/

// promise
//     .then(result => {
//         console.log('回调函数',result);
//         return '锄禾日当午'
//     })
//     .then(result => {
//         console.log('第二个then',result);
//         return '飞流直下三千尺'
//     })
//     .then(result => {
//         console.log(result);
//     })




// promise.then(result => {
//     console.log(result);
// })

// promise.then(result => {
//     console.log(result);
// },reason => {
//     console.log('出错了',reason);
// })

// function sum(a,b,cb){
//     setTimeout(() => {
//         cb(a+b)
//     },1000)
// }

// sum(123,456,(result) => {
//     console.log(result);
// })

function sum(a,b){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(a + b)    
        },1000)
    })
}

// sum(123,456).then(
//     result => {
//         console.log(result);
//     }
// )

sum(123,456)
    .then(result => result + 7) //箭头函数后没有大括号{}则箭头指的就是返回值（箭头函数简写）
    .then(result => result + 8)
    .then(result => result + 9)
    .then(result => console.log(result))




