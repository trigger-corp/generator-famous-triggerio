/* globals require */
require.config({
    paths: {
        "famous": "../lib/famous",
        "requirejs": "../lib/requirejs/require",
        "es6-promise": "../lib/es6-promise/promise"
    }
});
require(["es6-promise", "main"]);
