import * as R from 'ramda';
const {is,not}=R;
/*
用于将json字符串解构，最终生成数组，如果不是合法jsonp，则会生成空数组，如果原本是对象，则会包含在数组中
*/
//json_decode :: string -> array
const json_decode=function (str){
  let res;
  try {
    res=JSON.parse(str);
  } catch (e) {
    res=[];
  }
  if (not(is(Array,res))) {
    res=[res];
  }
  return res;
};

export default json_decode;
