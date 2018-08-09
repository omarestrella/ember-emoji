ember-emoji
==============================================================================

The goal of ember-emoji is to provide applications with a complete set of
components & helpers to include emojis in their project, courtesy of
[EmojiOne](https://emojione.com).

Demo: <link>


Requirements
------------

 - Ember.js 2.12+
 - Node.js 6.10+


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


Support
-------

Encountered a bug or thought of a feature? Please file it! I will do my best to
triage the ticket and support you as I can.


License
-------

This project is licensed under the [MIT License](LICENSE.md).
