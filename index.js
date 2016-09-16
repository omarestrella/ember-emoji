/* jshint node: true */
'use strict';

var path = require('path');

var pkg = require('./package.json');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var json = require('broccoli-json-module');
var esTranspiler = require('broccoli-babel-transpiler'); // needed for json export conversion

module.exports = {
    name: 'ember-emoji-one',

    isDevelopingAddon: function () {
        return true;
    },

    // treeForAddon: function () {
    //     var tree = this._super.treeForAddon.apply(this, arguments);
    //     var emojiTree = new Funnel(this.nodeModulesPath, {
    //         srcDir: 'emojione',
    //         destDir: 'emojione',
    //         files: ['emoji.json']
    //     });
    //     return mergeTrees([tree, json(emojiTree)]);
    // },

    treeForVendor: function () {
        var tree = this._super.treeForVendor.apply(this, arguments);
        var emojiTree = new Funnel(this.nodeModulesPath, {
            srcDir: 'emojione',
            destDir: 'emojione',
            include: ['lib/js/**/*']
        });
        var jsonTree = new Funnel(this.nodeModulesPath, {
            srcDir: 'emojione',
            destDir: 'emojione',
            files: ['emoji.json']
        });
        jsonTree = esTranspiler(json(jsonTree), {
            compact: true,
            modules: 'amd',
            moduleRoot: pkg.name,
            moduleIds: true
        });
        return mergeTrees([tree, emojiTree, jsonTree]);
    },

    included: function (app, parentAddon) {
        this.app = (app || parentAddon);
        this._super.included(this.app);

        app.import('vendor/emojione/emoji.js');
        app.import('vendor/emojione/lib/js/emojione.js');
    }
};
