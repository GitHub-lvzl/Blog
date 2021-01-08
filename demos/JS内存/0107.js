function printMe(){
    var mem = process.memoryUsage();
    var format = function(bytes){
        return (bytes/1024/1024).toFixed(0) + 'MB';
    };
    console.log('ToTal:' + format(mem.heapTotal) + 'Used:' + format(mem.heapUsed));
}

var arr = [];
var size = 30 * 1024 * 1024;
function notGolbal() {
    var noarr = [];
    for (let i = 0; i < 3; i++) {
        noarr.push(new Array(size));
    }
}
notGolbal();
setInterval(()=>{
    arr.push(new Array(size));
    printMe();
}, 1000);

// for (let i = 0; i < 15; i++) {
//     arr.push(new Array(size));
//     printMe();
// }
