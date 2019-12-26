
import {getDrop} from './dropdown_selects';

const $=jQuery;
const dropdown_select_hide = function (){
  getDrop().addClass('hidden').children('.select-ul').html('');
};

export default dropdown_select_hide;
