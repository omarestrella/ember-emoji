import Ember from 'ember';

const {
    computed,
    Component
} = Ember;

export default Component.extend({
    tagName: 'img',
    classNames: ['emoji-icon'],
    attributeBindings: ['src', 'emoji:data-emoji-code'],

    emoji: null,

    src: computed('emoji', function () {
        const html = window.emojione.toImage(this.get('emoji'));
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild.src;
    })
});
