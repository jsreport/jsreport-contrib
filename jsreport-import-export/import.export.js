﻿var fs = require("fs"),
    extend = require("node.extend");


module.exports = function(reporter, definition) {

    reporter.on("express-configure", function(app) {

        app.get("/api/import-export/:shortid", function(req, res, next) {

            var context = reporter.startContext();

            context.templates.single(function(t) { return t.shortid == this.id; }, { id: req.params.shortid }, function(result) {
                var clone = extend(true, {}, result.initData);

                delete clone._id;
                delete clone.shortid;
                
                res.send(clone);
            });
        });

        app.post("/api/import-export/:shortid", function(req, res, next) {
            var context = reporter.startContext();

            context.templates.single(function(t) { return t.shortid == this.id; }, { id: req.params.shortid }, function(template) {
                context.templates.attach(template);

                for (var f in req.files) {
                    var file = req.files[f];

                    fs.readFile(file.path, function(err, content) {
                        extend(true, template, JSON.parse(content));
                        context.templates.saveChanges().then(function() {
                           
                            var result = JSON.stringify({ "success": true });
                            res.send(result);
                        });
                    });
                }
            });
        });
    });
};