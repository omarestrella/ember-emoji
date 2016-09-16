import Ember from 'ember';

import layout from './template';

const {
    inject,
    Component
} = Ember;

export default Component.extend({
    layout,
    classNames: ['emoji-picker'],

    service: inject.service('emoji')
});