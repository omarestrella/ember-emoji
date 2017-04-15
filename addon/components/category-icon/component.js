import Ember from 'ember';
import layout from './template';

const {
    assert,
    inject,
    computed,
    Component
} = Ember;

export default Component.extend({
    layout,
    classNames: ['category-icon', 'emoji-icon-container', 'clickable'],
    classNameBindings: ['_categoryClass', 'isActive'],

    service: inject.service('emoji'),

    category: null,
    activeCategory: null,

    didInsertElement() {
        this._super(...arguments);
        assert('You must provide a category', this.get('category') !== null);
    },

    click() {
        this.sendAction('action');
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
