
const $=jQuery;

//get_ul :: htmlElement -> jQuery Object
const get_ul=function (ele) {
  let ul=$(ele).children('[data-field="selected"]');
  return ul.eq(0);
};

export default get_ul;
