define(['backbone', 'vcomponent'], function (Backbone, v) {
    return Backbone.View.extend({
        Model: Backbone.Model,

        initialize: function () {
            this.model = new this.Model();
            this.render();
        },

        render: function () {
            var div = document.createElement('div');
            div.innerHTML = this.template || '<!-- no html -->';

            this.$v = new v.VComponent({
                startNode: div.firstChild,
                endNode: div.lastChild
            });

            this.$v.registerComponents(this.getComponents());
            this.$v.render();

            this.ready();

            // 将node放到页面中去
            var me = this;
            setTimeout(function () {
                me.el.innerHTML = '';
                while (div.childNodes.length) {
                    me.el.appendChild(div.childNodes[0]);
                }
            });

        },

        ready: function () {},

        getComponents: function () {
            return [];
        },

        destroy: function () {
            this.$v.destroy();
        }
    });
});
