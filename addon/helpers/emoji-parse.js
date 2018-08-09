import Helper from '@ember/component/helper';
import { htmlSafe } from '@ember/string';
import { assign } from '@ember/polyfills';
import emojione from 'emojione';

const SUPPORTED_OPTIONS = [
    'greedyMatch',
    'imageTitleTag',
    'sprites',
    'unicodeAlt',
    'ascii'
];

const DEFAULTS = SUPPORTED_OPTIONS.reduce((acc, option) =>
    Object.assign(acc, { [option]: emojione[option] }), {});

export function emojiParse([input], options) {
    if (!input) {
        return '';
    }

    options = assign({}, DEFAULTS, options);

    SUPPORTED_OPTIONS.forEach(option => {
        if (options.hasOwnProperty(option)) {
            emojione[option] = options[option];
        }
    });

    return htmlSafe(emojione.toImage(input));
}

export default Helper.extend({
    compute: emojiParse
});
