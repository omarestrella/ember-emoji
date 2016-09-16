import Ember from 'ember';
import Emoji from 'ember-emoji-one/emojione/emoji';

const {
    get,
    computed,
    Service
} = Ember;

const ORDER = [
    'people',
    'nature',
    'food',
    'activity',
    'travel',
    'objects',
    'symbols',
    'flags',
    'extras'
];

const DISABLED = [
    'modifier',
    'regional'
];

const CATEGORY_ICONS = {
    people: ':grinning:',
    nature: ':dog:',
    food: ':apple:',
    activity: ':soccer:',
    travel: ':automobile:',
    objects: ':desktop:',
    symbols: ':ok:',
    flags: ':flag_us:',
    extras: ':shrug:',
    modifier: ':grinning:',
    regional: ':grinning:'
};

export default Service.extend({
    __emoji: Emoji,

    categories: computed(function () {
        const categories = [];
        for (let key of Object.keys(Emoji)) {
            if (Emoji.hasOwnProperty(key)) {
                const emoji = Emoji[key];
                const { category } = emoji;

                if (category && categories.indexOf(category) === -1 && DISABLED.indexOf(category) === -1) {
                    categories.push(category);
                }
            }
        }
        return categories.sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b));
    }),

    iconForCategory(category) {
        return get(CATEGORY_ICONS, category);
    }
});