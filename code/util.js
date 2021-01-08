/**
 * 获取dom节点的样式
 * @param {Object} obj 哪个对象
 * @param {Object} attr 什么属性
 */
function getStyle(obj, attr) {
  if (obj.currentStyle) {
    // 针对IE浏览器
    return obj.currentStyle[attr];
  } else {
    // 针对于Firefox浏览器
    return getComputedStyle(obj, null)[attr];
  }
}
