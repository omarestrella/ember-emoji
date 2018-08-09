import Component from '@ember/component';

import layout from './template';

export default Component.extend({
    layout,
    tagName: 'span',
    classNames: ['emoji', 'emoji-icon', 'emoji-icon-container', 'clickable'],
    attributeBindings: ['emoji:data-emoji-code'],

    emoji: null,
    selectEmoji: () => {},

    click() {
        this.get('selectEmoji')(this.get('emoji'));
    }
});
