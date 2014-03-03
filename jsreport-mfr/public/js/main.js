define(["jquery", "app", "marionette", "backbone", "./mfr.template.view", "./mfr.template.model"],
    function($, app, Marionette, Backbone, TemplateView, Model) {
        
        app.on("template-extensions-render", function(context) {
            var model = new Model();
            var view = new TemplateView({ model: model });
            view.setTemplateView(context.view);
            
            setTimeout(function() {
                context.extensionsRegion.show(view, "mfr");
            }, 0);
        });
    });