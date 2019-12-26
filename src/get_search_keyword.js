
import * as R from 'ramda';
const {trim}=R;
/*
用于获取组件中已输入的文本
*/
const $=jQuery;

const get_search_keyword = function (ele){
  return trim($(ele).find('[data-field="input"]').val());
};

export default get_search_keyword;
