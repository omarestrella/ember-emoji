import Controller from '@ember/controller';

export default Controller.extend({
    message: null,
    selectedEmoji: null,

    value: 'Test out an emoji! :grinning:',

    actions: {
        selectEmoji(emoji) {
            this.set('message', `Selected ${emoji}`);
            this.set('selectedEmoji', emoji);
        }
    }
});
