/*
初始化选项下拉列表

所有下拉只使用一个，在body中append，变更的只是数据，
当组件active的时候显示出来，当组件leave的时候隐藏掉并删除内部数据
显示的时候，根据active的组件位置，使用绝对定位到组件下方

## 下拉使用html范例：
<div class="dropdown-selects" data-field="dropdown-selects">
  <ul class="select-ul">
    <li class="select-item" data-field="select-item" data-key="{key}" data-value="{value}" title="{value}">{value}</li>
    ...
  </ul>
</div>

*/

import {hasDrop,createDrop,getDrop,getDropUl} from './dropdown_selects';
import set_dropdown_data from './set_dropdown_data';

const $=jQuery;

const moveTo = function (ele){
  let o=$(ele).offset();
  getDrop().css({
    'position':'absolute',
    'left':o.left,
    'top':o.top+$(ele).outerHeight(),
    'width':$(ele).width()
  }).removeClass('hidden');
};

const dropdown_select_show = function (ele){
  if (!hasDrop()) createDrop();
  moveTo(ele);
  getDropUl().html('<li>Loading...</li>');
  set_dropdown_data(ele);
};

export default dropdown_select_show;
