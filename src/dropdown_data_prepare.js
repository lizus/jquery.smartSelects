import * as R from 'ramda';
const {filter,not,is,isNil,match,compose}=R;

import get_source from './get_source';
import get_search_keyword from './get_search_keyword';
import json_decode from './json_decode';
import {get_ajax_source,has_ajax_source,set_ajax_source} from './ajax_source';
import do_ajax from './do_ajax';

const $=jQuery;

/*
准备数据
*/

const dropdown_data_prepare = function (ele){
  const filterData=compose(filter(function (val){
          if (not(is(Object,val)) || isNil(val.value) || isNil(val.key)) return false;
          if(match(get_search_keyword(ele),val.value).length>0) return true;
          return false;
        }),json_decode);

  /*
  如果本地source中的数据已经足够，则直接调用，如果不够数量，则查看搜索关键词对应的ajax-source，存在则显示（不管是否有数据，没有数据表示ajax查询过没有数据），不存在则关键词长度减1，查看是否存在ajax-source，如果不存在，则关键词长度减1，继续查询。如果存在，filterData后数量足够，则直接显示，如果数量不够则使用ajax查询关键词，然后将结果存入对应的ajax-source再显示
  */
  let num=$(ele).attr('data-row')-0 || 10;
  let data=filterData(get_source(ele));
  if (data.length>=num) {
    return $.when(data);
  }else {
    let s=get_search_keyword(ele);
    let newData=null;
    while (s.length>=0) {
      if (has_ajax_source(ele,s)) {
        newData=filterData(get_ajax_source(ele,s));
        break;
      }
      if (s.length == 0) break;
      s=s.substring(0,s.length-1);
    }
    if (!isNil(newData)) {
      newData=data.concat(newData);
      if (newData.length>=num || s == get_search_keyword(ele)) return $.when(newData);
    }
    return $.when(do_ajax(ele,get_search_keyword(ele))).then(function (res){
      set_ajax_source(ele,get_search_keyword(ele),res);
      return $.when(data.concat(filterData(res)));
    },function (res){
      set_ajax_source(ele,get_search_keyword(ele),'[]');
      return $.when(data.concat(filterData([])));
    });
  }

};

export default dropdown_data_prepare;
