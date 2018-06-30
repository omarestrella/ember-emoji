import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | emoji-picker', function (hooks) {
    setupRenderingTest(hooks);

    test('it renders categories and emoji', async function (assert) {
        await render(hbs`{{emoji-picker}}`);

        assert.ok(this.element.querySelector('.emoji-picker'), 'Emoji picker was rendered');

        const categories = this.element.querySelectorAll('.emoji-picker .category-icon');
        assert.equal(categories.length, 8, 'All currently supported categories are included');

        const emoji = this.element.querySelectorAll('.emoji-picker .emoji-icon');
        assert.ok(emoji.length > 0, 'Emoji are rendered');
    });

    test('you can switch categories', async function (assert) {
        const extractEmojiFromIcon = e => e.firstElementChild.alt;

        await render(hbs`{{emoji-picker}}`);
        const firstEmoji = Array.from(this.element.querySelectorAll('.emoji-picker .emoji-icon'));

        await click('.nature-emoji');
        const newEmoji = Array.from(this.element.querySelectorAll('.emoji-picker .emoji-icon'));

        assert.notEqual(firstEmoji.length, newEmoji.length, 'Quanity of emoji differs');
        assert.notDeepEqual(firstEmoji.map(extractEmojiFromIcon),
            newEmoji.map(extractEmojiFromIcon), 'Emojis are not the same');
    });
});
