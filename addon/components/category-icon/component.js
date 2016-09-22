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
    tagName: 'span',
    classNames: ['emoji-category-icon'],
    classNameBindings: ['_categoryClass'],

    service: inject.service('emoji'),

    category: null,

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

    _category: computed('category', function () {
        return `${this.get('category')}-emoji`;
    })
});