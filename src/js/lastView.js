/**
 * 最后一屏的逻辑
 */

export default function () {
  //1，手指移入哪个li，其余的透明度变成0.5，自己不变
  //2，手指移入哪个li，哪个li会有相应气泡产生
  //3，手指移出，所有li的透明度为1，气泡消失
  const liNodes = document.querySelectorAll('.team-lists li');

  for (let i = 0; i < liNodes.length; i++) {
    //添加手指移入事件
    liNodes[i].onmouseenter = function () {
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = 0.5;
      }
      this.style.opacity = 1;
    };
    //添加手指移出事件
    liNodes[i].onmouseleave = function () {
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = 1;
      }
    }
  }
}
