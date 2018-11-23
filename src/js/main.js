/**
 * 1，头部逻辑和滚动条的逻辑。
 */

export default function () {
  const liNodes = document.querySelectorAll('.nav li');
  const arrowNode = document.querySelector('.arrow');
  const ulNode = document.querySelector('#content>ul');
  const contentNode = document.querySelector('#content');

  //代表内容区li的下标
  let nowIndex = 0;
  let wheelTimer = null;

//缓存小箭头一半的宽度（减少重绘重排，因为为了得到最准确的值，浏览器会刷新页面。会进行重绘重排，成本大）
  const arrowHalfWidth = arrowNode.offsetWidth / 2;
  const contentHeight = contentNode.offsetHeight;

  //设置小箭头的起始位置。别忘记加px
  arrowNode.style.left = liNodes[0].getBoundingClientRect().left + liNodes[0].offsetWidth / 2 - arrowHalfWidth + 'px';

  //设置头部
  //1，设置导航中每个li中，鼠标点击哪个li哪个li对应添加active类。2，小箭头的位置改变。
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onclick = function () {
      nowIndex = i;
      move(nowIndex);
    };
  }

  //第二部分：添加滚轮事件（1，内容区的ul一屏一屏的发生滚动/2，小箭头随着发生变化）
  //谷歌和ie的滚轮事件
  document.onmousewheel = wheel;
  //火狐的滚轮事件
  document.addEventListener && document.addEventListener('DOMMouseScroll',wheel);

  function wheel(event) {
    event = event || window.event;

    //函数防抖。只让最后一次生效
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(()=> {
      let flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down';
        }
      }
      //up代表滚轮向上滑动。down代表滚轮向下滑动
      switch (flag) {
        case 'up' :
          if(nowIndex > 0){
            nowIndex--;
            move(nowIndex);
          }
          // console.log(contentHeight);
          break;
        case 'down' :
          if(nowIndex < 4){
            nowIndex++;
            move(nowIndex);
          }
          // console.log(contentHeight);
          break;
      }
    },200);

    //禁止默认行为
    event.preventDefault && event.preventDefault();
    return false;
  }

  function move(nowIndex) {
    //先让所有的li都没有class类
    for (var j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
    }
    //对应的导航li添加class类
    liNodes[nowIndex].className = 'active';
    //改变小箭头的位置
    arrowNode.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //设置ul的高度
    ulNode.style.top = -nowIndex * contentHeight + 'px';
  }

  //当窗口改变的时候：重新计算小箭头的位置和ul的位置
  window.onresize = function () {
    //改变小箭头的位置
    arrowNode.style.left = liNodes[nowIndex].getBoundingClientRect().left + liNodes[nowIndex].offsetWidth / 2 - arrowHalfWidth + 'px';
    //改变ul的位置（重新计算一遍）
    contentHeight = contentNode.offsetHeight;
    ulNode.style.top = -nowIndex * contentHeight + 'px';
  }


}