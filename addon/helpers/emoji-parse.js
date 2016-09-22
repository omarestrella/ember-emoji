import Ember from 'ember';

const {
    Helper,
    String: Str
} = Ember;

export default Helper.extend({
    compute([input]) {
        return Str.htmlSafe(window.emojione.toImage(input));
    }
});