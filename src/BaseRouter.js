define(['backbone', 'underscore'], function (Backbone, u) {
    return Backbone.Router.extend({
        contentEl: document.getElementById('content'),
        getContentEl: function () {
            return this.contentEl;
        },

        context: {},
        getContext: function () {
            return this.context;
        },

        initialize: function () {
            Backbone.Router.prototype.initialize.apply(this, arguments);
            this.createRoute();
        },

        createRoute: function () {
            var me = this;
            u.forEach(this.routes, function (View, route) {
                me.route(route, route, function () {
                    me.createView(View, me.getContentEl());
                });
            });
        },

        createView: function (View, el) {
            this.currentContentView && this.currentContentView.destroy();
            this.currentContentView = null;
            this.currentContentView = new View({
                el: el,
                context: this.getContext()
            });
        }
    });
});
