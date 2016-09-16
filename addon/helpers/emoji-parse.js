import Ember from 'ember';

const {
    Helper
} = Ember;

export default Helper.extend({
    compute([input]) {
        return window.emojione.toImage(input);
    }
});