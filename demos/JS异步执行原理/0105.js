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
// 1324

