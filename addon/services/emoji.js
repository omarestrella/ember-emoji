import Ember from 'ember';
import Emoji from 'ember-emoji-one/emojione/emoji';

const {
    get,
    computed,
    A,
    Service
} = Ember;

const CACHE = {};

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
        for (let key of Object.keys(this.__emoji)) {
            if (this.__emoji.hasOwnProperty(key)) {
                const emoji = this.__emoji[key];
                const { category } = emoji;

                if (category && categories.indexOf(category) === -1 && DISABLED.indexOf(category) === -1) {
                    categories.push(category);
                }
            }
        }
        return A(categories.sort((a, b) => ORDER.indexOf(a) - ORDER.indexOf(b)));
    }),

    iconForCategory(category) {
        return get(CATEGORY_ICONS, category);
    },

    emojiForCategory(category) {
        const cached = CACHE[category];
        if (cached) {
            return cached;
        }

        CACHE[category] = [];

        for (let key of Object.keys(this.__emoji)) {
            if (this.__emoji.hasOwnProperty(key)) {
                const emoji = this.__emoji[key];
                if (emoji.category === category) {
                    CACHE[category].push(emoji.shortname);
                }
            }
        }

        return A(CACHE[category]);
    }
});