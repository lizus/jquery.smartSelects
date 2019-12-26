
const $=jQuery;

/*
发起ajax请求，ele为组件，s为关键词，需要拼接url，用get方式发起请求
*/
const do_ajax = function (ele,s){
  let url=$(ele).find('[data-field="ajax"]').val();
  if (url) {
    let data={
      s:s
    };
    return $.get(url,data);
  }
  return $.when([]);
};

export default do_ajax;
