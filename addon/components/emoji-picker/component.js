import { inject as service } from '@ember/service';
import Component from '@ember/component';

import layout from './template';

export default Component.extend({
    layout,
    classNames: ['emoji-picker', 'ember-emoji-one'],

    service: service('emoji'),

    activeCategory: null,
    selectEmoji: () => {},

    actions: {
        selectCategory(category) {
            this.set('activeCategory', category);
        },

        selectEmoji(emoji) {
            this.get('selectEmoji')(emoji);
        }
    },

    init() {
        this._super(...arguments);
        this.set('activeCategory', this.get('service.categories.firstObject'));
    }
});
