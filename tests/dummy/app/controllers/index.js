import Ember from 'ember';

const {
    Controller
} = Ember;

export default Controller.extend({
    message: null,
    selectedEmoji: null,

    actions: {
        selectEmoji(emoji) {
            this.set('message', `Selected ${emoji}`);
            this.set('selectedEmoji', emoji);
        }
    }
});
