import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import Component from '@ember/component';

import layout from './template';

export default Component.extend({
    layout,
    classNames: ['emoji-grid'],

    service: service('emoji'),

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
