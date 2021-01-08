/**
 * 通过定时器实现模拟的动画效果
 * @param {Object} ele 当前元素节点对象
 * @param {Object} json 当前元素的属性，及属性值（运动后想要达到的状态）
 * @param Number v 运动的速度快慢，此值越大，速度越小
 * @param {Object} fn 达到一个临界值时清除定时器后执行回调函数
 */
function startMove(ele, json, v, fn) {
    var speed = 0;
    // 1.先关闭定时器 再开启定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
      // 做个标杆，如果为true，证明所有的属性已到达终点值
      var flag = true;
      for (var attr in json) {
        // console.log(attr,json[attr]);
        // 1.1 获取样式属性
        var cur = 0;
        switch (attr) {
        case 'opacity':
          cur = Math.round(parseFloat(getStyle(ele, attr)) * 100);
          break;
        case 'scrollTop':
          cur = json[attr];
          break;
        default:
          cur = parseInt(getStyle(ele, attr));
          break;
        }
        // 1.2.求出步长
        if (isNaN(Number(v))) {
          return;
        }
        speed = (json[attr] - cur) / Number(v);
        // 1.3 判断speed的正负
        speed = json[attr] > cur ? Math.ceil(speed) : Math.floor(speed);
        // 1.4 如果所有的属性没到达终点值。继续执行下面的代码
        if (cur !== json[attr]) {
          flag = false;
        }
        // 1.5 处理属性名为opacity
        switch (attr) {
        case 'opacity':
          ele.style[attr] = 'alpha(opacity:' + (cur + speed) + ')';
          ele.style[attr] = (cur + speed) / 100;
          break;
        case 'scrollTop':
          ele[attr] = cur + speed;
          break;
        default:
          ele.style[attr] = cur + speed + 'px';
          break;
        }
      }
      // 1.6 如果flag是成立的，证明所有的属性都到达终点，此时清除定时器，执行回调函数
      if (flag) {
        clearInterval(ele.timer);
        if (fn) {
          fn();
        }
      }
    }, 30);
  };
