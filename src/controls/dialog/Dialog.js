define(
    [
        'vcomponent',
        '../../createClass',
        '../../tplloader!./dialog.html',
        'underscore'
    ],
    function (
        v,
        createClass,
        tpl,
        u
    ) {
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
                isVisible = isVisible === 'true' ? true : false;
            }

            this.setState({isVisible: isVisible});
        };

        return createClass(v.Component, Dialog, {
            getStyle: function () {

            }
        });
    }
);
