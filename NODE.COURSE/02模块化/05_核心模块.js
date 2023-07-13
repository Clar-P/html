// 核心模块， 是node中自带的模块，可以在node中直接使用
// window 是浏览器的宿主对象， node中是没有的
// global 是node中的全局对象，作用类似于window
// es标准下，全局对象的标准名应该是globalThis

//console.log(globalThis);


/* 
    核心模块
        process
            - 表示当前node的进程
            - 通过该对象可以获取进程的信息，或者对进程做各种操作
            - 如何使用
                1，process是一个全局变量，可以直接使用
                2.有哪些属性和方法：
                    process.exit()
                        -结束当前进程 ，终止node
                    process.nextTick(callback[,...args])
                        - 将函数插入到 tick队列中
                        - tick队列中的代码，会在下一次事件循环之前执行
                            会在微任务队列和宏任务队列中的任务之前执行

                调用栈
                tick队列
                微任务队列
                宏任务队列
*/
// console.log(111);
// process.exit(0)
// console.log(222);
// console.log(333);

setTimeout(() => {
    console.log(1) // 宏任务队列
})

queueMicrotask(() => {
    console.log(2); //微任务队列
})

process.nextTick(() => {
    console.log(3); //tick队列，后被微任务队列代替，但优先级还是比微任务队列高
})

console.log(4); //调用栈