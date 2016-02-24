/**
 * @file Input控件，对原生input的封装
 *      props:
 *          type
 *          value
 *          validateRegExp
 *          validateRegExpMessage
 *          validateFn
 *          onValidateResult
 *          validateWhenChange
 *          onValidateResult
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define([
    'vcomponent',
    '../createClass',
    'underscore'
], function (
    v,
    createClass,
    u
) {
    function Input() {
        v.Component.apply(this, arguments);
    }

    Input.prototype.getTemplate = function () {
        return '' +
            '<input type="${state.type}"' +
            ' class="${props.class.concat(\' \')}"' +
            ' value="${state.value}"' +
            ' ref="input"' +
            ' on-change="${state.onChange()}"' +
            ' />';
    };

    /**
     * 就绪
     *
     * @protected
     */
    Input.prototype.ready = function () {
        this.setState({
            type: this.props.type || 'text',
            value: this.props.value || '',
            onChange: u.bind(this.onChange, this)
        });
    };

    /**
     * input发生改变的回调函数
     *
     * @private
     */
    Input.prototype.onChange = function () {
        if (this.props.validateWhenChange && this.props.validateWhenChange !== 'false') {
            var result = this.validate();
            if (this.props.onValidateResult instanceof Function) {
                this.props.onValidateResult(result);
            }
        }

        if (this.props.onChange instanceof Function) {
            this.props.onChange();
        }
    };

    /**
     * 设置值
     *
     * @public
     * @param {*} value 值
     */
    Input.prototype.setValue = function (value) {
        this.setState({
            value: value
        });
    };

    /**
     * 获取控件值
     *
     * @public
     * @return {*}
     */
    Input.prototype.getValue = function () {
        return this.refs.input.getValue();
    };

    /**
     * 验证数据合法性
     *
     * @public
     * @return {boolean|string} 如果返回false，说明验证不通过；
     *                          如果返回true，则说明验证通过；
     *                          如果返回字符串，则说明验证不通过，字符串是不通过的原因。
     */
    Input.prototype.validate = function () {
        var value = this.getValue();

        if (this.props.validateRegExp instanceof RegExp) {
            if (!this.props.validateRegExp.test(value)) {
                return this.props.validateRegExpMessage || false;
            }
        }

        if (this.props.validateFn instanceof Function) {
            var validateResult = this.props.validateFn(value);

            if (!validateResult) {
                return false;
            }

            if (u.isString(validateResult)) {
                return validateResult;
            }
        }

        return true;
    };

    return createClass(v.Component, Input, {
        getStyle: function () {
            return '' +
                'input {' +
                'height: 2.4rem;' +
                'border: .06rem solid #ccc;' +
                'padding: 0 .4rem;' +
                'font-size: 1.1rem;' +

                '&:focus,' +
                '&:active {' +
                'outline: none;' +
                'border-color: #66afe9;' +
                '}' +
                '}';
        }
    });
});
