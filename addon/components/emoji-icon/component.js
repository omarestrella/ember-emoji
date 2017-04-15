import Ember from 'ember';

import layout from './template';

const {
    computed,
    Component
} = Ember;

export default Component.extend({
    layout,
    tagName: 'span',
    classNames: ['emoji', 'emoji-icon', 'emoji-icon-container', 'clickable'],
    attributeBindings: ['emoji:data-emoji-code'],

    emoji: null,
    selectEmoji: () => {},

    click() {
        this.get('selectEmoji')();
    }
});
