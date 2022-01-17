/* 
EventLoop

宏任务:
+ 定时器：监听时间，到达时间触发的回调函数
+ 时间绑定：监听事件，事件触发执行绑定的方法
+ ajax、fetch等创建的网络请求，从服务器请求数据
+ ..
微任务：
+ Promise：them。resolve。reject通知注册的onfulfilled、oinrejected方法执行
+ asynv/await
*/
