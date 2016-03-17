/**
 * @file 对话框组件
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define(function (require) {
    var u = require('underscore');
    var v = require('vcomponent');
    var createClass = require('../../createClass');
    var tpl = require('../../tplloader!./dialog.html');

    function Dialog() {
        return v.Component.apply(this, arguments);
    }

    Dialog.prototype.getTemplate = function () {
        return tpl;
    };

    Dialog.prototype.ready = function () {
        this.show();
    };

    Dialog.prototype.propsChange = function () {
        this.show();
    };

    Dialog.prototype.show = function () {
        var isVisible = this.props.isVisible;
        if (u.isString(isVisible)) {
            isVisible = isVisible === 'true';
        }

        this.setState({isVisible: isVisible});
    };

    return createClass(v.Component, Dialog, {
        getStyle: function () {

        }
    });
});
