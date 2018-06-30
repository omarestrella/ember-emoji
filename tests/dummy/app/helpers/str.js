import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export default Helper.helper(input => {
    return htmlSafe(input.join(''));
});
