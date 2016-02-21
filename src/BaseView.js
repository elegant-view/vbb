define(['backbone', 'vcomponent'], function (Backbone, v) {
    return Backbone.View.extend({
        Model: Backbone.Model,

        initialize: function () {
            this.model = new this.Model();
            this.render();
        },

        render: function () {
            this.el.innerHTML = this.template;

            this.$v = new v.VComponent({
                startNode: this.el,
                endNode: this.el
            });

            this.$v.registerComponents(this.getComponents());
            this.$v.render();

            this.ready();
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
