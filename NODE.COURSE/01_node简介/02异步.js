/* 
    进程和线程
        -进程（厂房）
            -程序的运行的环境
        -线程（工人）
            -线程是实际进行运算的东西

    同步
        -通常情况下代码都是自上而下一行一行执行的
        -前边的代码不执行后面的代码也不会执行
        -同步的代码执行会出现阻塞的情况
        -一代码执行慢会影响到整个程序的执行

    解决同步问题：、
        -Java python
            -通过多线程来解决
        -node.js
            -通过异步的方式来解决

    异步
        -一行代码的执行不会影响到其他程序的执行
        -异步的问题：
            -异步的代码无法通过return来接收返回值
        -异步的特点;
            1.不会阻塞其他代码的执行
            2.需要通过回调函数来返回结果
        -基于回调函数的异步带来的问题：
            1.代码的可读性差
            2.可调式性差
        -解决问题：
            -需要一个东西，可以代替回调函数来给我们返回结果
            -Promise横空出世
                -Promise 是一个可以用来存储数据的对象
                    Promise 存储数据的方式比较特殊
                    这种特殊方式使得Promise可以用来存储异步调用的数据
*/

    /* console.log('哈哈');
    console.log('嘻嘻');
    console.log('嘿嘿'); */

function sum(a,b,cb){
    const begin = Date.now()

    setTimeout(() => {
        cb(a + b)
    },1000)
}

console.log('111111');

sum(123,456,(result) => {
    sum(result,7,(result) => {
        sum(result,8,(result) => {
            sum(result,9,(result) => {
                sum(result,10,(result) => {
                    console.log(result);
                })
            })
        })
    })
})
    



console.log('22222');