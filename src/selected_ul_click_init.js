const $=jQuery;

import get_selected_ul from './get_selected_ul';

const hasInput = function (ele){
  return $(ele).find('[data-field="input"]').length>0;
};

const getInput = function (ele){
  return $(ele).find('[data-field="input"]').eq(0);
}

const selected_ul_click_init = function (ele){
  function get_selected_ul_click(){
    $(ele).attr('data-status','active');
    let total=$(ele).attr('data-total') - 0;
    if(total>0 && total <= $(this).children('[data-field="selected-item"]').length) {
      return;
    }
    if (!hasInput(this)) {
      $(this).append('<li class="input-item item"><input type="text" class="input-item-text" data-field="input"></li>');
    }
    getInput(this).trigger('focus');
    $(ele).trigger('selected-click');
  }
  get_selected_ul(ele).on('click',get_selected_ul_click);
};

export default selected_ul_click_init;
