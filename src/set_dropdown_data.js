import * as R from 'ramda';
const {not,is,isNil,map,filter,match}=R;

import json_decode from './json_decode';
import get_search_keyword from './get_search_keyword';
import get_source from './get_source';
import {getDropUl} from './dropdown_selects';
import dropdown_data_prepare from './dropdown_data_prepare';

const $=jQuery;

/*
设置下拉的列表项
先用搜索词查看source项，如果结果大于20条，则不再查ajax
若结果少于20条，查看ajax-source的ajax-source={关键词}项，如果有结果就显示,
*/

const set_dropdown_data = function (ele){
  dropdown_data_prepare(ele).then(function (res){
    if (res.length<1) {
      res=[
        {
          key:'new-item',
          showValue:'未找到任何结果，添加：'+get_search_keyword(ele),
          value:get_search_keyword(ele)
        }
      ];
    }
    getDropUl().html(map(function (val){
      let s=get_search_keyword(ele);
      return '<li class="item" data-field="dropdown-selects-item" data-key="'+val.key+'" data-value="'+val.value+'" title="'+val.value+'">'+(val.showValue || val.value).replace(s,'<span>'+s+'</span>')+'</li>';
    },res).join(''));
  })
};

export default set_dropdown_data;
