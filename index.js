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
        return true;
    },

    treeForVendor() {
        const tree = this._super(...arguments);

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

    included() {
        this._super(...arguments);

        this.import(require.resolve('emojione'));
        this.import('vendor/shims/emojione.js');
        this.import('vendor/emoji.js');
    }
};
