import Ember from 'ember';

import layout from './template';

const {
    inject,
    Component
} = Ember;

export default Component.extend({
    layout,
    classNames: ['emoji-picker', 'ember-emoji-one'],

    service: inject.service('emoji'),

    activeCategory: null,

    actions: {
        selectCategory(category) {
            this.set('activeCategory', category);
        }
    },

    init() {
        this._super(...arguments);
        this.set('activeCategory', this.get('service.categories.firstObject'));
    }
});
