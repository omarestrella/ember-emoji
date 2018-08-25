'use strict';

const path = require('path');
const pkg = require('./package.json');
const json = require('broccoli-json-module');
const mergeTrees = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const esTranspiler = require('broccoli-babel-transpiler');

module.exports = {
    name: 'ember-emoji',

    isDevelopingAddon() {
        return process.env.EMOJI_DEV_MODE;
    },

    treeForVendor(tree) {
        this._super(...arguments);

        const location = path.dirname(require.resolve('emojione/emoji.json'));
        const jsonFunnel = funnel(location, {
            files: ['emoji.json']
        });
        const jsonTree = esTranspiler(json(jsonFunnel), {
            compact: true,
            moduleRoot: pkg.name,
            plugins: [
                'babel-plugin-transform-es2015-modules-amd'
            ],
            moduleIds: true
        });

        const trees = [jsonTree];
        if (tree) {
            trees.push(tree);
        }

        return mergeTrees(trees);
    },

    included(app) {
        this._super(...arguments);

        const options = app.options['ember-emoji'];

        this.import(require.resolve('emojione'));
        this.import('vendor/shims/emojione.js');
        this.import('vendor/emoji.js');

        if (options && options.autocomplete) {
            this.import('node_modules/jquery.caret/dist/jquery.caret.js');
            this.import('node_modules/at.js/dist/js/jquery.atwho.js');
            this.import('node_modules/at.js/dist/css/jquery.atwho.css');
        }
    }
};
