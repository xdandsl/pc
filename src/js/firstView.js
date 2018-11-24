/**
 * 第一屏的小圆点和旋转的逻辑
 */

export default function () {
  //获取小圆点
  const pointsNodes = document.querySelectorAll('.home_point li');
  const liNodes = document.querySelectorAll('.home_carousel li');
  const homeNode = document.querySelector('.home');

  //记录当前显示li的索引
  let nowIndex = 0;
  //记录上一次显示li的索引
  let lastIndex = 0;
  
  let lastTime = 0;
  let timer = null;

  //给小圆点添加单击事件
  for (let i = 0; i < pointsNodes.length; i++) {
    pointsNodes[i].onclick = function () {

      //函数节流
     const nowTime = Date.now();
     if(nowTime-lastTime<2500) return;

      //更新nowIndex的值
      nowIndex = i;

      //点击同一个小圆点不处理
      if(nowIndex === lastIndex) return;

      //判断是向右点，还是向左点
      if(nowIndex>lastIndex){
        //右点
        liNodes[nowIndex].className = 'commonTitle rightShow';
        liNodes[lastIndex].className = 'commonTitle leftHide';
      }else{
        //左点
        liNodes[nowIndex].className = 'commonTitle leftShow';
        liNodes[lastIndex].className = 'commonTitle rightHide';
      }

      //让上一次的小圆点清空，当前的加上active
      pointsNodes[lastIndex].className = '';
      pointsNodes[nowIndex].className = 'active';

      //同步nowIndex的值
      lastIndex = nowIndex;

      lastTime = nowTime;
    }
  }

  autoPlay();
  function autoPlay() {
    timer = setInterval(function () {
      nowIndex++;

      //让元素发生旋转
      if(nowIndex === 4){
        nowIndex = 0;
      }
      liNodes[nowIndex].className = 'commonTitle rightShow';
      liNodes[lastIndex].className = 'commonTitle leftHide';

      //让上一次的小圆点清空，当前的加上active
      pointsNodes[lastIndex].className = '';
      pointsNodes[nowIndex].className = 'active';

      lastIndex = nowIndex;
    },2000)
  }

  //绑定鼠标移入移出事件
  /*
   mouseenter mouseleave(没有事件冒泡)
   mouseover mouseout
   */
  //手指移入清除轮播（给父元素home加。）
  homeNode.onmouseenter = function () {
    //清除轮播
    clearInterval(timer);
  };
  homeNode.onmouseleave = autoPlay;

}
