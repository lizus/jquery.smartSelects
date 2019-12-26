
import json_decode from './json_decode';
import {get_key,get_value} from './source_data';

const $=jQuery;

const get_li=function (val){
  if (typeof val != 'object') return '';
  let key=get_key(val);
  let value=get_value(val);
  if (key && value) return '<li class="item" data-field="selected-item" data-key="'+key+'" data-value="'+value+'" title="'+value+'">'+value+'</li>';
  return '';
};

const get_selected_lis = function (val){
  return $.map(json_decode(val),get_li);
};

export default get_selected_lis;
