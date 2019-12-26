
const $=jQuery;

/*
用于获取data-field为key的表单项的值
*/
//get_field_val :: htmlElement -> string -> string
const get_field_val = function (ele,key){
  return $(ele).find('[data-field="'+key+'"]').val();
};

export default get_field_val;
