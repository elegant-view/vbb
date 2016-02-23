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

        function Field() {
            v.Component.apply(this, arguments);
        }

        Field.prototype.getTemplate = function () {
            return '' +
                '<div class="${props.class}">' +
                    '<label>${props.label}</label>' +
                    '<div>${props.children}</div>' +
                    '<!-- if: props.errorMessage --><ui-tip type="error">${props.errorMessage}</ui-tip><!-- /if -->' +
                '</div>';
        };

        Field.prototype.getComponentClasses = function () {
            return [Tip];
        };

        return createClass(v.Component, Field, {
            getStyle: function () {
                return '' +
                    '.field {' +
                        'display: flex;' +
                        'align-items: center;' +
                        'margin-bottom: .5rem;' +
                    '}' +
                    '.field label {' +
                        'width: 5rem;' +
                        'text-align: right;' +
                        'margin-right: 1rem;' +
                    '}' +
                    '.field .tip {' +
                        'margin-left: 1rem;' +
                    '}';
            }
        });

});
