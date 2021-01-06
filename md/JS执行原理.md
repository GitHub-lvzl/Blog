# JS执行原理

今天根据自己学的东西，跟大家分享下JS的执行原理。先看个小demo吧

```javascript
const { log } = console;
log(1); // 首先呢，JS代码是从上至下逐行执行，到这里先打印 1
setTimeout(() => { // 到了这里，遇到了异步任务，把异步操作加到异步队列中，然后接着往下执行JS代码
  log(2);
});
new Promise((resolve, reject) => { 
  log(3); // 执行到这里，这里的代码也是同步的，因此打印 3
  resolve(); // resolve 执行以后会进入.then, .then里面也是异步执行， 因此加入异步队列，整个的JS代码第一次就执行完了
}).then(() => {
  log(4);
});
// 现在异步队列中有两个任务, setTimeout，Promise.then. JS在执行下一个宏任务之前会保证微任务队列为空，因此会先打印 4, 再打印 3
// 微任务: Promise.then, process.nextTick(node)
// 宏任务: 整体的JS代码, setTimeout, setInterval
// 正确答案: 1324
```

看完上面简单的小demo呢, 再看一道比较复杂的吧.

![image-20210106171804168](https://img2020.cnblogs.com/blog/2089555/202101/2089555-20210106174701502-2062917244.png)

正确答案：pr2 pr3 1 then2 then3 set1 pr1 then1 set2 set3

最后送上执行的流程图：

![image-20210106171804169](https://img2020.cnblogs.com/blog/2089555/202101/2089555-20210106174701043-1416802229.jpg)

参考

> [网易云课堂公开课视频](https://study.163.com/course/courseLearn.htm?courseId=1210407064)

> [*tasks-microtasks-queues-and-schedules*](*https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules*)

> [github](https://github.com/GitHub-lvzl/Blob)