import $ from 'jquery';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { fillIn, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | emoji-autocomplete', function (hooks) {
    setupRenderingTest(hooks);

    test('attaches itself to sibling textarea', async function (assert) {
        await render(hbs`<textarea></textarea> {{emoji-autocomplete}}`);
        assert.equal(this.$('.emoji-autocomplete').length, 1, 'Emoji autocomplete rendered');
        assert.ok(this.$('textarea').data('atwho'), 'Atwho attached');
    });

    test('attaches itself to a target when supplied', async function (assert) {
        await render(hbs`<div id="test-target"><input></div> {{emoji-autocomplete target="#test-target input"}}`);
        assert.equal(this.$('.emoji-autocomplete').length, 1, 'Emoji autocomplete rendered');
        assert.ok(this.$('input').data('atwho'), 'Atwho attached');
    });

    test('displays autocomplete when typing', async function (assert) {
        const emoji = this.owner.lookup('service:emoji');
        emoji.__emojiNames = ['grin', 'grinning'];

        await render(hbs`<textarea></textarea> {{emoji-autocomplete}}`);
        await fillIn('textarea', ':grin');
        this.$('textarea').click();

        assert.equal($('.atwho-view li').length, 2, 'Emojis are displayed for value');
    });
});
