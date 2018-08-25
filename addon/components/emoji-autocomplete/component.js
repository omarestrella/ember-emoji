import $ from 'jquery';
import Ember from 'ember';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { emojiParse } from 'ember-emoji/helpers/emoji-parse';

const SUPPORTED_TAGS = ['input', 'textarea'];

export default Component.extend({
    classNames: ['ember-emoji', 'emoji-autocomplete'],
    classNameBindings: ['searchingEmoji::hidden'],
    attributeBindings: ['style'],

    emoji: inject(),

    enabled: true,

    value: null,
    target: null,

    init() {
        this._super(...arguments);

        if (!$.fn.atwho) {
            this.enabled = false;
        }
    },

    didInsertElement() {
        this._super(...arguments);

        if (!this.enabled) {
            Ember.Logger.warn('Please enable autocomplete in your EmberApp options before using this component.');
            return;
        }

        this._elem = this.findTarget();
        if (!this._elem) {
            Ember.Logger.warn('Target element not found. Make sure you pass in `target` attribute.');
            return;
        }

        $(this._elem).atwho({
            at: ':',
            alias: 'ember-emoji-autocomplete',
            data: this.get('emoji.__emojiNames'),
            displayTpl: (option) => {
                const shortcode = `:${option.name}:`;
                return `<li>
                    ${emojiParse([shortcode])}
                    <span>\${name}</span>
                </li>`
            },
            insertTpl: ':${name}:'
        });
    },

    findTarget() {
        const target = this.get('target');
        if (target) {
            return document.querySelector(target);
        }

        const prevSibling = this.element.previousElementSibling;
        const nextSibling = this.element.nextElementSibling;

        if (prevSibling && SUPPORTED_TAGS.includes(prevSibling.tagName.toLowerCase())) {
            return prevSibling;
        }

        if (nextSibling && SUPPORTED_TAGS.includes(nextSibling.tagName.toLowerCase())) {
            return nextSibling;
        }
    }
});
