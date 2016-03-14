define(function (require) {
    var Backbone = require('backbone');
    var u = require('underscore');

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
                me.route(route + '~*params', route, function (params) {
                    me.createView(View, me.getContentEl(), me.parseHashParams(params));
                });
            });
        },

        createView: function (View, el, urlArgs) {
            this.currentContentView && this.currentContentView.destroy();
            this.currentContentView = null;
            this.currentContentView = new View({
                el: el,
                context: this.getContext(),
                urlArgs: urlArgs
            });
        },

        parseHashParams: function parseHashParams(params) {
            if (!params) {
                return {};
            }

            params = params.split('&');

            var ret = {};
            u.map(params, function (item) {
                var itemSplit = item.split('=');
                if (itemSplit.length === 2) {
                    ret[itemSplit[0]] = itemSplit[1];
                }
            });
            return ret;
        }
    });
});
