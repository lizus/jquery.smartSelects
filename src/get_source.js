
import * as R from 'ramda';
const {trim}=R;

const $=jQuery;

const get_source = function (ele){
  return trim($(ele).find('[data-field="source"]').val());
};

export default get_source;
