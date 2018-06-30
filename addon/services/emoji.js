import { get, computed } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';
import Emoji from 'ember-emoji-one/emoji';

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
    travel: ':motorcycle:',
    objects: ':desktop:',
    symbols: ':ok:',
    flags: ':flag_us:',
    extras: ':shrug:',
    modifier: ':grinning:',
    regional: ':grinning:'
};

export default Service.extend({
    __emoji: Emoji,
    __cache: CACHE,

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

        const emojis = Object.keys(this.__emoji).reduce((acc, key) => {
            const emoji = this.__emoji[key];
            if (emoji.category === category) {
                const isDiverse = !!emoji.diversity;
                const isNonGendered = emoji.diversities.length > 0 && !emoji.gender;
                if (isDiverse || isNonGendered) {
                    return acc;
                }

                return acc.concat(emoji.shortname);
            }

            return acc;
        }, []);

        CACHE[category] = A(emojis);

        return CACHE[category];
    }
});
