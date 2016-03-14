define(function (require) {
    var Backbone = require('backbone');
    var u = require('underscore');
    var Promise = require('promise');

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
                me.route(route + '*params', route, function (params) {
                    params = me.parseHashParams(params);
                    var contentEl = me.getContentEl();
                    me.createView(View, contentEl, params);
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

            var me = this;
            Promise.resolve(this.currentContentView.canEnter())
                .then(function (canEnter) {
                    if (canEnter) {
                        me.currentContentView.enter();
                    }
                });
        },

        parseHashParams: function parseHashParams(params) {
            if (!params || params.indexOf('~') !== 0) {
                return {};
            }

            params = params.slice(1).split('&');

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
