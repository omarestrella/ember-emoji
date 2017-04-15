import Ember from 'ember';

import layout from './template';

const {
    inject,
    computed,
    Component
} = Ember;

export default Component.extend({
    layout,
    classNames: ['emoji-grid'],

    service: inject.service('emoji'),

    category: null,
    selectEmoji: () => {},

    actions: {
        selectEmoji(emoji) {
            this.get('selectEmoji')(emoji);
        }
    },

    emojis: computed('category', function () {
        return this.get('service').emojiForCategory(this.get('category'));
    })
});
