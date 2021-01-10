 /**
 * 创建锚点
 * @param {string} position 锚点显示的位置 'left:左边, right: 右边'
 * @param {array} array {text:锚点中文描述, divid: 锚点对应的divid}
 * @param {string} mountDivId 挂载到哪个div下面，多页签时，挂载到某个页签，页签切换时，锚点跟着隐藏
 * @param {string} scrollDomId 滚动事件添加到哪个元素，因有时很多div都设置了overflow:auto,而滚动条只会出现在最里层overflow为auto的元素上
 */
 function createAnchorPoint(position, array, mountDivId, scrollDomId) {
  // 最外层div
  if (!mountDivId || !scrollDomId) {
    return;
  }
  if (!array || !Array.isArray(array)) {
    return;
  }
  var mountDom = document.getElementById(mountDivId);
  var scrollDom = document.getElementById(scrollDomId);
  var _p = position || 'right';
  var isClick = false;
  var fixedDiv = document.createElement('div');
  fixedDiv.setAttribute('id', 'yuxp_anchor_fixed');
  fixedDiv.setAttribute('class', _p == 'right' ? 'fixed_right' : 'fixed_left');
  // 收起按钮
  var getOff = document.createElement('i');
  getOff.setAttribute('title', '收起');
  getOff.setAttribute('class', _p == 'right' ? 'yu-icon-arr-right1 icon-right' : 'yu-icon-arr-right1 icon-left');
  getOff.onclick = function (e) {
    fixedDiv.style.display = 'none';
    geton.style.display = 'block';
  };
  // 展开按钮
  var geton = document.createElement('i');
  geton.setAttribute('title', '展开');
  geton.setAttribute('class', _p == 'right' ? 'yu-icon-arr-left1 icon-on-right' : 'yu-icon-arr-left1 icon-on-left');
  geton.onclick = function (e) {
    fixedDiv.style.display = 'block';
    geton.style.display = 'none';
  };
  var span = document.createElement('span');
  span.setAttribute('class', 'yuxp_anchor_ink');
  fixedDiv.appendChild(getOff);
  fixedDiv.appendChild(span);
  mountDom.appendChild(geton);
  var ul = document.createElement('ul');
  // 创建锚点
  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var ulspan = document.createElement('span');
    var uli = document.createElement('i');
    uli.setAttribute('class', 'yuxp_ul_i');
    ulspan.setAttribute('class', 'yuxp_ul_span');
    var li = document.createElement('li');
    li.setAttribute('class', 'yuxp_anchor_li');
    li.innerText = element.text;
    li.divid = element.divid;
    li.index = i;
    var anchorbox = document.getElementById(element.divid);
    if (anchorbox) {
      anchorbox.className = anchorbox.className + ' anchor_box';
    }
    // 锚点的点击事件
    li.onclick = function (e) {
      isClick = true;
      var index = 0;
      var lidoms = document.getElementsByClassName('yuxp_anchor_li');
      var idoms = document.getElementsByClassName('yuxp_ul_i');
      // 移除当前选中的锚点选中class
      var lidom = document.getElementsByClassName('is_checked');
      if (lidom.length > 0) {
        lidom[0].className = 'yuxp_anchor_li';
      }
      var idom = document.getElementsByClassName('isball_checked');
      if (idom.length > 0) {
        idom[0].className = 'yuxp_ul_i';
      }
      for (var j = 0; j < lidoms.length; j++) {
        if (this.divid == lidoms[j].divid) {
          index = j;
        }
      }
      idoms[index].className = idoms[index].className.indexOf('isball_checked') > 0 ? idoms[index].className : idoms[index].className + ' isball_checked';
      this.className = this.className.indexOf('is_checked') > 0 ? this.className : this.className + ' is_checked';
      startMove(this, { scrollTop: this.index * document.body.clientHeight }, 20, function () {
        isClick = false;
      });
      // isClick = false;
      window.location = '#' + this.divid;
    };
    ulspan.appendChild(uli);
    ulspan.appendChild(li);
    ul.appendChild(ulspan);
  }
  fixedDiv.appendChild(ul);
  // var d1 = document.getElementById('d1');
  scrollDom.onscroll = function (e) {
    if (!isClick) {
      var docScrollTop = scrollDom.scrollTop || document.body.scrollTop;
      var lidom = document.getElementsByClassName('yuxp_anchor_li');
      var idoms = document.getElementsByClassName('yuxp_ul_i');
      var anchor_box = document.getElementsByClassName('anchor_box');
      for (var i = 0; i < anchor_box.length; i++) {
        if (docScrollTop > anchor_box[i].offsetTop) {
          // 恢复选中的样式
          var lidom_checked = document.getElementsByClassName('is_checked');
          if (lidom_checked.length > 0) {
            lidom_checked[0].className = 'yuxp_anchor_li';
          }
          var idom_checked = document.getElementsByClassName('isball_checked');
          if (idom_checked.length > 0) {
            idom_checked[0].className = 'yuxp_ul_i';
          }
          idoms[i].className = idoms[i].className.indexOf('isball_checked') > 0 ? idoms[i].className : idoms[i].className + ' isball_checked';
          lidom[i].className = lidom[i].className.indexOf('is_checked') > 0 ? lidom[i].className : lidom[i].className + ' is_checked';
        }
      }
    }
  };
  mountDom.appendChild(fixedDiv);
};