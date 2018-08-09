import $ from 'jquery';
import { emojiParse } from 'ember-emoji/helpers/emoji-parse';
import { module, test } from 'qunit';

const TEST_EMOJI = {
    '😀': ':grinning:',
    '🐶': ':dog:'
};

module('emoji-parse', function () {
    test('parses emoji from its string representation', function (assert) {
        const html = emojiParse([':grinning:']).toString();
        const attr = $(html).attr('alt');
        assert.equal(TEST_EMOJI[attr], ':grinning:');
    });

    test('parses emoji inside a string', function (assert) {
        const string = emojiParse(['Hello :dog: World']).toString();
        const html = string.match(/Hello (.*) World/)[1];
        const attr = $(html).attr('alt');
        assert.equal(TEST_EMOJI[attr], ':dog:');
    });

    test('parses unicode emoji into emoji-one', function (assert) {
        const html = emojiParse(['😀']).toString();
        const attr = $(html).attr('alt');
        assert.equal(TEST_EMOJI[attr], ':grinning:');
    });
});
