import '../less/styles.less';
/*
# jquery.smartSelect.js

用于生成更好的下拉选框，更智能，通过录入自动筛选，数据源支持ajax（仅get方法)

## 组件模板：

<div class="smartSelect" data-component="smartSelect" data-total="2" data-row="10">
  <textarea class="smartSelect-value hidden" data-type="jsonp" data-field="value" name="sample"></textarea>
  <textarea class="smartSelect-source hidden" data-type="jsonp" data-field="source"></textarea>
  <input class="smartSelect-ajax hidden" type="hidden" data-type="string" data-field="ajax" value="https://sample.com" />
  <ul class="selected-ul" data-field="selected"></ul>
</div>

## 说明：

data-component="smartSelect" 为识别码，加载时会自动启用功能，如果是使用js生成的内容，则在加入dom后需使用$(this).smartSelect();启动
data-total="2" 为选项取值数量，例如：2表示需要选择2个值
data-row="10" 表示结果少于10项时，则重新提交ajax查询源（如果设置了ajax的话）
data-field="value" 为选项值的存储元素，其name值作为提交表单时的该选项的key，值为jsonp，解构后示例如下：
                [
                  {
                    key: 'hello',
                    value: 'world'
                  },
                  {
                    key: 'hello',
                    value: 'world'
                  },
                ]
data-field="source" 为选项的源，格式同value，此项较ajax项优先使用，与ajax项至少要有一项存在
data-field="ajax" 为ajax取选项的源，value为ajax提交的url，使用get方法，所以在提交时还要根据搜索词构造url，获取到的选项源存为data-field="ajax-source"，data-ajax-source="{搜索关键词}"
data-field="selected" 为已选择列表

## 组件上的事件：

点击： selected-click
输入改变： selected-change
离开： selected-leave

当组件被点击(selected-click)时，设置组件data-status="active" 标识激活状态。
当组件离开(selected-leave)时，设置组件data-status="leave" 标识离开状态。

*/
import * as R from 'ramda';
const {curry,compose}=R;

import json_decode from './json_decode';
import json_encode from './json_encode';
import get_value from './get_value';
import set_value from './set_value';
import selected_ul_init from './selected_ul_init';
import selected_ul_click_init from './selected_ul_click_init';
import dropdown_select_show from './dropdown_select_show';
import dropdown_select_hide from './dropdown_select_hide';
import set_dropdown_data from './set_dropdown_data';
import get_search_keyword from './get_search_keyword';

(function($){
  $.fn.smartSelect=function (){
    let that=this;

    /*
    使用data-install来标识是否已对组件进行过处理，done表示已处理，则不再运行
    */
    if ($(this).attr('data-install') == 'done' ) return;
    $(this).attr('data-install','done');

    $.when(get_value(this))
     .then(selected_ul_init(this))
     .then(selected_ul_click_init);

    /*
    已选择项点击的时候删除对应的值
    */
    $(this).on('selected-item-click',function (e,it){
      $(it).remove();
      set_value(this);
    });

    /*
    当组件被点击的时候激活下拉
    */
    $(this).on('selected-click',function (){
      dropdown_select_show(this);
    });

    /*
    当鼠标点击组件以外的地方
    */
    $(this).on('selected-leave',function (){
      $(this).attr('data-status','');
      dropdown_select_hide();
    });

    /*
    下拉选项点击
    */
    $(this).on('dropdown-selectes-item-click',function (e,item){
      let add=curry(function (it,target){
        target=target.concat([
          {
            key:$(it).attr('data-key'),
            value:$(it).attr('data-value')
          }
        ]);
        return json_encode(target);
      });
      compose(selected_ul_init(this),add(item),json_decode,get_value)(this).then(set_value);
    });
  };

  $(document).on('click',function (e){
    e=e || window.event;
    let tag='[data-component="smartSelect"]';
    let activeSmartSelect=$(tag).filter('[data-status="active"]');

    /*
    点击组件外的时候，触发selected-leave事件
    */
    if ($(e.target).closest(tag).length == 0) {
      $(tag).trigger('selected-leave');
    }

    /*
    下拉选项点击
    */
    let dropdown_selects_item='[data-field="dropdown-selects-item"]';
    if ($(e.target).closest(dropdown_selects_item).length > 0) {
      activeSmartSelect.trigger('dropdown-selectes-item-click',$(e.target).closest(dropdown_selects_item));
    }

    /*
    已选择的元素被点击的时候，删除该元素，并删除值
    */
    let selected_item='[data-field="selected-item"]';
    if ($(e.target).closest(selected_item).length > 0) {
      activeSmartSelect.trigger('selected-item-click',$(e.target).closest(selected_item));
    }

  });

  let inputCount=0;

  $(document).on('keyup','[data-field="input"]',function (e){
    clearTimeout(inputCount);
    e=e || window.event;
    let tag='[data-component="smartSelect"]';
    let activeSmartSelect=$(tag).filter('[data-status="active"]');
    inputCount=setTimeout(function (){
      set_dropdown_data(activeSmartSelect);
    },500);
  });

  /*
  自动加载
  */
  $('[data-component="smartSelect"]').each(function (){
    $(this).smartSelect();
  });
})(jQuery);
