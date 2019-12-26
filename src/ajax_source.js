import * as R from 'ramda';
const {trim}=R;

const $=jQuery;

const do_s=function (s){
  return trim(s) || 'all-source';
};

const get_ajax_source=function (ele,s){
  return $(ele).find('[data-field="ajax-source"]').filter('[data-ajax-source="'+do_s(s)+'"]').val();
};

const has_ajax_source=function (ele,s){
  return $(ele).find('[data-field="ajax-source"]').filter('[data-ajax-source="'+do_s(s)+'"]').length>0;
};

const set_ajax_source=function (ele,s,val){
  if (has_ajax_source(ele,s)) {
    $(ele).find('[data-field="ajax-source"]').filter('[data-ajax-source="'+do_s(s)+'"]').val(val);
  }else {
    let textarea=$('<textarea></textarea>');
    textarea.attr('data-type','jsonp');
    textarea.attr('data-field','ajax-source');
    textarea.attr('data-ajax-source',do_s(s));
    textarea.addClass('hidden');
    textarea.addClass('smartSelect-ajax-source');
    textarea.val(val);
    $(ele).prepend(textarea);
  }
};

export {
  get_ajax_source,
  has_ajax_source,
  set_ajax_source
};
