/* globals define */
define(function(require, exports, module) {
    "use strict";

    // Import famo.us dependencies
    var Engine = require("famous/core/Engine");
    var FastClick = require("famous/inputs/FastClick");

    // Create main application view
    var AppView = require("views/AppView");
    var context = Engine.createContext();
    context.setPerspective(2000);
    var view = new AppView();
    context.add(view);
});
