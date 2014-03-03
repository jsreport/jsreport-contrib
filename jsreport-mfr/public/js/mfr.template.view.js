define(["app", "marionette", "core/view.base"], function(app, Marionette, ViewBase) {
    return ViewBase.extend({
        tagName: "li",
        template: "mfr-template",

        events: {
            "click #download": "download"
        },
        
        initialize: function() {
            _.bindAll(this, "setTemplateView");
        },
        
        onDomRefresh: function() {
            this.$el.find(".expandable-header").click();
        },

        setTemplateView: function(templateView) {
         
            templateView.beforeRenderListeners.add(function(request, done) {

                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    contentType: 'application/json',
                    url: "https://portal-test.mobilefieldreport.com/mfr/ReportDefinition/" + $("#externalId").val() + "/ReportData",
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    timeout : 10000,
                }).done(function(sr) {
                    request.data = JSON.stringify(sr);
                    done();
                }).fail(function(e) {
                    done("Unable to load service request with external id:" + $("#externalId").val());
                });
            });
        },
    });
});