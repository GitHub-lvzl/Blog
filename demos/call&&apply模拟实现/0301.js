Function.prototype.call2 = function(context, firstParam){
    var context = Object(context) || window;
    var result;
    context.fn = this;
    if (!firstParam) {
        result = context.fn();
    } else {
        var args = [];
        for(var i = 1; i < arguments.length; i++){
            args.push('arguments[' + i + ']');
        }
        result = eval('context.fn(' + args +')');
    }
    delete context.fn;
    return result;
}
Function.prototype.apply2 = function(context, paramArr){
    var context = Object(context) || window;
    var result;
    context.fn = this;
    if (!paramArr || !Array.isArray(paramArr)) {
        result = context.fn();
    } else {
        var args = [];
        for(var i = 0; i < paramArr.length; i++){
            args.push('paramArr[' + i + ']');
        }
        result = eval('context.fn(' + args +')');
    }
    delete context.fn;
    return result;
}
var obj = {
    val: '2021'
}
function testCall(name, age){
    console.log(this.val, 'name' + name, 'age' + age);
    return this.val;
}
// console.log(testCall.call2(obj, '小明', '18'));
console.log(testCall.apply2(obj, ['小明', '18']));

// PS C:\GitHub\Blog\demos\call&&apply模拟实现> node .\0301.js
// 2021 name小明 age18
// 2021
// PS C:\GitHub\Blog\demos\call&&apply模拟实现> 