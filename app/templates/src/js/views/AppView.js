/* globals define, forge */
define(function(require, exports, module) {
    var View = require("famous/core/View");
    var Modifier = require("famous/core/Modifier");
    var Transform = require("famous/core/Transform");
    var Surface = require("famous/core/Surface");

    function AppView() {
        View.apply(this, arguments);

        _createDefaultView.call(this);

        forge.logging.info("Add Javascript to js/views/AppView.js!");
    }
    AppView.prototype = Object.create(View.prototype);
    AppView.prototype.constructor = AppView;

    AppView.DEFAULT_OPTIONS = {
    };

    function _createDefaultView() {
        var surface = new Surface({
            size: [undefined, 200],
            content: "Trigger.io<br/>&#9825;'s<br/>Famo.us!",
            properties: {
                fontSize: "50px",
                fontWeight: "bold",
                textAlign: "center"
            },
            classes: ["backfaceVisibility"]
        });

        var initialTime = Date.now();
        this.add(new Modifier({
            origin: [0.5, 0.5],
            transform : function() {
                return Transform.rotateX(0.0005 * (Date.now() - initialTime));
            }
        })).add(new Modifier({
            transform : function() {
                return Transform.rotateY(0.0007 * (Date.now() - initialTime));
            }
        })).add(surface);
    }

    module.exports = AppView;
});
