import get_field_val from './get_field_val';
/*
用于获取组件元素data-field="value"的值
*/
const get_value = function (ele){
  return get_field_val(ele,'value');
};

export default get_value;
