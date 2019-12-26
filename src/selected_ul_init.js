import * as R from 'ramda';
const {curry}=R;
const $=jQuery;

import get_selected_ul from './get_selected_ul';
import get_selected_lis from './get_selected_lis';

/*
selected-ul初始化
*/
const selected_ul_init = curry(function (ele,val){
  get_selected_ul(ele).html(get_selected_lis(val).join(''));
  return $.when(ele);
});

export default selected_ul_init;
