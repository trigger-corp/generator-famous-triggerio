"use strict"; /* jslint node: true */

var path = require("path");
var yeoman = require("yeoman-generator");
var yosay = require("yosay");
var chalk = require("chalk");
var fs = require("fs");

var TriggerioGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.config.defaults({
            projectName: "Trigger.io Famo.us Base",
            projectDesc: "Seed project to get started with Trigger.io and Famo.us",
            githubUser: "username",
            author: {
                name: this.user.git.username || process.env.user || process.env.username,
                email: this.user.git.email
            },
            changedDir: false
        });
        this.projectName = this.config.get("projectName");
        this.projectDesc = this.config.get("projectDescription");
        this.authorEmail = this.config.get("author").email;
        this.authorName = this.config.get("author").name;
        this.githubUser = this.config.get("githubUser");

        this.on("end", function () {
            if (!this.options["skip-install"]) {
                this.installDependencies({
                    bower: true,
                    npm: false,
                    skipInstall: false,
                    skipMessage: true,
                    callback: function () {
                        this.log();
                        this.log(chalk.green("Yay!") + " App structure created. To proceed:");
                        this.log();
                        this.log( "1) Run " + chalk.yellow("forge build") + " to make a build");
                        this.log( "2) Run " + chalk.yellow("forge serve") + " to work on your app");
                        this.log( "3) Make changes to your app in the 'src' folder.");
                    }.bind(this)
                });
            }
        }.bind(this));
    },

    askFor: function () {
        this.log(yosay("Welcome to the Famo.us Triggerio generator!"));

        var prompts = [{
            name: "githubUser",
            message: "Would you mind telling me your username on GitHub?",
            default: "username"
        }];

        var done = this.async();
        this.prompt(prompts, function (props) {
            this.config.set("githubUser", props.githubUser);
            this.spawnCommand("forge", ["create"]) // TODO find forge
                    .on("error", function (error) {
                        this._exitWithError(error);
                        return;
                    })
                    .on("exit", function (status) {
                        if (status !== 0) {
                            this._exitWithError("Failed with status code: " + status);
                            return;
                        }
                        fs.readFile("src/config.json", function (error, data) {
                            if (error) {
                                this._exitWithError(error);
                                return;
                            }
                            var config = JSON.parse(data.toString());
                            this.projectName = config.name;
                            this.projectDesc = config.description;
                            this.authorEmail = config.author;
                            this.authorName = this.config.get("author").name || config.author.split("@")[0];
                            this.githubUser = this.config.get("githubUser");
                            done();
                        }.bind(this));
                    }.bind(this));
        }.bind(this));
    },

    app: function () {
        [ "src/css/bootstrap.css",
          "src/js/bootstrap.js",
          "src/js/jquery-2.0.2.js",
          "src/js/main.js",
          "src/index.html" ].forEach(function (path) {
            this._remove(path);
        }.bind(this));

        this.template("README.md", "README.md");
        this.copy("src/index.html", "src/index.html");
        this.copy("src/css/default.css", "src/css/default.css");
        this.mkdir("src/js/views");
        this.copy("src/js/main.js", "src/js/main.js");
        this.copy("src/js/requireConfig.js", "src/js/requireConfig.js");
        this.copy("src/js/views/AppView.js", "src/js/views/AppView.js");
    },

    manifests: function () {
        this.template("_bower.json", "bower.json");
    },

    projectfiles: function () {
        this.copy("editorconfig", ".editorconfig");
        this.copy("jshintrc", ".jshintrc");
        this.copy("bowerrc", ".bowerrc");
    },

    _remove: function (_path) {
        try {
            fs.unlinkSync(path.normalize(_path));
        } catch (e) {
            this.log("Warning: Could not unlink " + e.path);
        }
    },

    _exitWithError: function (error) {
        this.log("We are experiencing a dastardly error event: " + error);
    }
});
module.exports = TriggerioGenerator;
