import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';

export default Component.extend({
    layout,
    classNames: ['category-icon', 'emoji-icon-container', 'clickable'],
    classNameBindings: ['_categoryClass', 'isActive'],

    service: service('emoji'),

    category: null,
    activeCategory: null,

    didInsertElement() {
        this._super(...arguments);
        assert('You must provide a category', this.get('category') !== null);
    },

    click() {
        this.get('action')();
    },

    emoji: computed('category', function () {
        return this.get('service').iconForCategory(this.get('category'));
    }),

    isActive: computed('category', 'activeCategory', function () {
        return this.get('category') === this.get('activeCategory');
    }),

    _categoryClass: computed('category', function () {
        return `${this.get('category')}-emoji`;
    })
});
