define(
    [
        'vcomponent',
        'underscore',
        '../createClass',
        './Field',
        './Input',
        'underscore'
    ],
    function (v,
              underscore,
              createClass,
              Field,
              Input,
              u) {

        function InputField() {
            v.Component.apply(this, arguments);
        }

        InputField.prototype.getTemplate = function () {
            return '' +
                '<ui-field label="${props.label}" error-message="${state.errorMessage}">' +
                '<ui-input' +
                ' ref="input"' +
                ' d-rest="${props}"' +
                ' validate-when-change="true"' +
                ' on-validate-result="${state.onValidateResult}">' +
                '</ui-input>' +
                '</ui-field>';
        };

        InputField.prototype.getComponentClasses = function () {
            return [Field, Input];
        };

        InputField.prototype.ready = function () {
            var me = this;
            this.setState({
                onValidateResult: function (result) {
                    if (!result) {
                        me.showError('输入有误');
                    }
                    else if (u.isString(result)) {
                        me.showError(result);
                    }
                    else {
                        me.showError(null);
                    }

                    if (me.props.onValidateResult instanceof Function) {
                        me.props.onValidateResult(result);
                    }
                }
            });
        };

        InputField.prototype.getValue = function () {
            return this.refs.input.getValue();
        };

        InputField.prototype.showError = function (msg) {
            this.setState({errorMessage: msg});
        };

        return createClass(v.Component, InputField, {
            getStyle: function () {

            }
        });
    }
);
