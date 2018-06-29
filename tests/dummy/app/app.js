import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
    modulePrefix: config.modulePrefix,
    podModulePrefix: config.podModulePrefix,
    Resolver,

    componentFor(id) {
        return this.__container__.lookup('-view-registry:main')[id];
    }
});

loadInitializers(App, config.modulePrefix);

export default App;
