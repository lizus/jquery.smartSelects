
const $=jQuery;

const hasDrop = function (){
  return $('body').children('.dropdown-selects').length>0;
};

const createDrop = function (){
  $('body').append('<div class="dropdown-selects" data-field="dropdown-selects"><ul class="select-ul"></ul></div>');
};

const getDrop = function (){
  return $('body').children('.dropdown-selects').eq(0);
};

const getDropUl = function (){
  return  getDrop().children('.select-ul').eq(0);
};

export {
  hasDrop,
  createDrop,
  getDrop,
  getDropUl
};
