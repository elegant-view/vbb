define(
    [
        'vcomponent',
        'underscore',
        '../createClass',
        './Field',
        './Input',
        'u'
    ],
    function (
        v,
        underscore,
        createClass,
        Field,
        Input,
        u
    ) {

        function InputField() {
            v.Component.apply(this, arguments);
        }

        InputField.prototype.getTemplate = function () {
            return '' +
                '<ui-field label="${props.label}" error-message="${state.errorMessage}">' +
                    '<ui-input' +
                        ' type="${props.type}"' +
                        ' value="${props.value}"' +
                        ' validate-regexp="${props.validateRegexp}">' +
                        ' validate-reg-exp-message="${props.validateRegExpMessage}"' +
                        ' validate-fn="${props.validateFn}"' +
                        ' validate-when-change="true"' +
                        ' on-validate-result="${state.onValidateResult}"' +
                    '</ui-input>' +
                '</ui-field>';
        };

        InputField.prototype.getComponentClasses = function () {
            return [Field, Input];
        };

        InputField.prototype.ready = function () {
            this.setState({
                onValidateResult: function (result) {
                    if (!result) {
                        this.setState({
                            errorMessage: '输入有误'
                        });
                    }
                    else if (u.isString(result)) {
                        this.setState({errorMessage: result});
                    }
                }
            });
        };

        return createClass(v.Component, InputField, {
            getStyle: function () {

            }
        });
});
