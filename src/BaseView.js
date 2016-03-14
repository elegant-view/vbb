define(function (require) {
    var Backbone = require('backbone');
    var v = require('vcomponent');
    var u = require('underscore');

    return Backbone.View.extend({
        Model: Backbone.Model,

        // 初始化的模板数据
        templateData: {},
        // 模板里面用到的回调函数，注意这些回调函数都会自定绑定this到当前view实例
        templateCallbacks: {},

        getTemplateData: function getTemplateData() {
            return this.templateData;
        },
        getTemplateCallbacks: function getTemplateData() {
            for (var key in this.templateCallbacks) {
                if (u.isString(this.templateCallbacks[key])) {
                    this.templateCallbacks[key] = this[this.templateCallbacks[key]];
                }

                if (!u.isFunction(this.templateCallbacks[key])) {
                    throw new Error('the variable `' + key + '` in templateCallbacks is not a function.');
                }
            }

            u.forEach(this.templateCallbacks, function (callback, key) {
                 this.templateCallbacks[key] = u.bind(callback, this);
            }, this);

            return this.templateCallbacks;
        },

        setData: function setData() {
            this.$v.setData.apply(this.$v, arguments);
        },

        getData: function getData() {
            return this.$v.getData.apply(this.$v, arguments);
        },

        ref: function ref() {
            return this.$v.ref.apply(this.$v, arguments);
        },

        initialize: function (options) {
            this.context = options.context;
            this.model = new this.Model();
            this.model.set(options.urlArgs);
            this.render();
            this.$v.setData(u.extend({}, this.getTemplateData(), this.getTemplateCallbacks()));
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
