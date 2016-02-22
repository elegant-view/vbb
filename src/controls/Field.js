/**
 * @file 表单字段基础控件
 * @props label
 *          children
 *          errorMessage
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define(
    [
        'vcomponent',
        'underscore',
        '../createClass',
        './Tip'
    ],
    function (
        v,
        underscore,
        createClass,
        Tip
    ) {

        function InputField() {
            v.Component.apply(this, arguments);
        }

        InputField.prototype.getTemplate = function () {
            return '' +
                '<fieldset>' +
                    '<label>${props.label}</label>' +
                    '<div>${props.children}</div>' +
                    '<!-- if: props.errorMessage --><ui-tip type="error">${props.errorMessage}</ui-tip><!-- /if -->' +
                '</fieldset>';
        };

        InputField.prototype.getComponentClasses = function () {
            return [Tip];
        };

        return createClass(v.Component, InputField, {
            getStyle: function () {

            }
        });

});
