
/*
根据组件的 data-field="selected" 中.item的值来重设组件的value
*/
import json_encode from './json_encode';
const $=jQuery;

const set_value = function (ele){
  $(ele).children('[data-field="value"]').val(json_encode($(ele).find('[data-field="selected-item"]').map(function (){
    return {
      key:$(this).attr('data-key'),
      value:$(this).attr('data-value')
    };
  }).get()));
};
export default set_value;
