import Ember from 'ember';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { bind } from '@ember/runloop';
import { computed } from '@ember/object';

const SUPPORTED_TAGS = ['input', 'textarea'];

export default Component.extend({
    classNames: ['ember-emoji', 'emoji-autocomplete'],
    attributeBindings: ['style'],

    emoji: inject(),

    target: null,
    position: null,

    _elem: null,
    _rect: null,
    _clone: null,

    style: computed('position', function () {
        const position = this.get('position');
        if (!position) {
            return '';
        }

        return `
            top: ${position.top}px;
            left: ${position.left}px;
        `;
    }),

    didInsertElement() {
        this._super(...arguments);

        this._elem = this.findTarget();
        if (!this._elem) {
            Ember.Logger.warn('Target element not found. Make sure you pass in `target` attribute.');
            return;
        }

        this._rect = this._elem.getBoundingClientRect();

        this.attachHandlers();
    },

    updateContent(initialize = false) {
        let end = this._elem.selectionEnd;
        if (initialize === true) {
            end = this._elem.value.length;
        }
        const text = this._elem.value.substring(0, end);

        let span = this._clone.firstChild;
        if (!span) {
            span = document.createElement('span');
            this._clone.appendChild(span);
        }
        span.textContent = text;

        const top = this._elem.scrollTop + this._rect.top;
        const left = span.offsetWidth +
            this._elem.scrollLeft +
            this._rect.left;

        console.log({ top, left });

        this.set('position', {
            top,
            left
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
    },

    applyStyle(target) {
        const computed = window.getComputedStyle(this._elem);
        const properties = Array.from(computed);
        properties.forEach(prop => {
            target.style[prop] = computed.getPropertyValue(prop);
        });
    },

    setupClone() {
        this._clone = document.createElement('div');
        this.applyStyle(this._clone);
        this._clone.style.position = 'absolute';
        this._clone.style.visibility = 'hidden';

        document.body.appendChild(this._clone);
    },

    destroyClone() {
        this._clone.remove();
        this._clone = null;
    },

    attachHandlers() {
        const keydown = bind(this, () => {
            this.updateContent();
        });

        const focus = bind(this, () => {
            this._elem.addEventListener('keydown', keydown);
            this._elem.addEventListener('blur', blur);

            this.setupClone();
            this.updateContent(true);
        });

        const blur = bind(this, () => {
            this.destroyClone();
            this._elem.removeEventListener('keydown', keydown);
            this._elem.removeEventListener('blur', blur);
        });

        this._elem.addEventListener('focus', focus);
    }
});
