ember-emoji
==============================================================================

The goal of ember-emoji is to provide applications with a complete set of
components & helpers to include emojis in their project, courtesy of
[EmojiOne](https://emojione.com).

Demo: <link>


Requirements
------------

 - Ember.js 2.15+
 - Node.js 6.12+


Browser Support
---------------

 - Firefox 58+
 - Safari (current)
 - Chrome 66+
 - Edge 40+
 - IE11


Installation
------------

Run the following command:

```bash
$ ember install ember-emoji
```

And thats it!


Usage
-----

### emoji-picker

A component that displays an emoji picker. Emojis are separated into different categories. You can provide an action to handle a user selecting an emoji.

#### Usage

```hbs
{{emoji-picker selectEmoji=(action "selectEmoji")}}
```

### emoji-icon

A component to render any emoji from any emoji shortcode. You can provide an action to handle the user selecting the emoji.

#### Usage

```hbs
{{emoji-icon emoji=":grinning:" selectEmoji=(action "selectEmoji")
```

### emoji-parse

A template helper that parses given text with emoji shortcodes (and optional ascii) and returns a string with EmojiOne images substituted in.

#### Usage

```hbs
{{emoji-parse "Hello! :grinning:"}}
```

You can also import the helper and use it inside of your Javascript:

```javascript
import { emojiParse } from 'ember-emoji/helpers/emoji-parse';

let str = emojiParse(["content"]);
```

### emoji-autocomplete

Autocomplete for emojis is opt-in in order to keep the host application payload low autocomplete is powered by [At.js](https://github.com/ichord/At.js). You can enable it in your application settings:

```javascript
let app = new EmberApp(defaults, {
    'ember-emoji': {
        autocomplete: true
    }
});
```

After enabling autocomplete, you can use the `{{emoji-autocomplete}}` component. In order for it to work correctly, you need to have the component sit next to its intended target in the document or pass in a query selector string as the `target` attribute.

```hbs
<textarea></textarea>
{{emoji-autocomplete}}

{{! or the target method}}
<div class="emoji-input-container">
    <input>
</div>
{{emoji-autocomplete target=".emoji-input-container input"}}
```


Support
-------

Encountered a bug or thought of a feature? Please file it! I will do my best to
triage the ticket and support you as I can.


License
-------

This project is licensed under the [MIT License](LICENSE.md).

This project uses EmojiOne v3 which has its own licensing. See [there information regarding licensing here](https://github.com/joypixels/emojione#license-to-use-emojione-images).
