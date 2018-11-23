/**
 * 主文件js
 */

//引入less
import '../less/index.less';

//设置头部
const liNodes = document.querySelectorAll('.nav li');
const arrowNode = document.querySelector('.arrow');

//缓存小箭头一半的宽度（减少重绘重排）
const arrowHalfWidth = arrowNode.offsetWidth / 2;

for (let i = 0; i < liNodes.length; i++) {
  liNodes[i].onclick = function () {
    //先让所有的li都没有class类
    for (var j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
    }
    this.className = 'active';
    arrowNode.style.left = liNodes[i].getBoundingClientRect().left + liNodes[i].offsetWidth / 2 - arrowHalfWidth + 'px';
  };
}

//设置小箭头的起始位置。别忘记加px
arrowNode.style.left = liNodes[1].getBoundingClientRect().left + liNodes[1].offsetWidth / 2 - arrowHalfWidth + 'px';
