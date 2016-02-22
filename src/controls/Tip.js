define([
    'vcomponent',
    '../createClass'
], function (
    v,
    createClass
) {
    function Tip() {
        v.Component.apply(this, arguments);
    }

    Tip.prototype.getTemplate = function () {
        return [
            '<div class="${props.class.concat(state.typeClass).join(\' \')}">${props.children}</div>'
        ].join('');
    };

    Tip.prototype.ready = function () {
        this.setTypeClass();
    };

    Tip.prototype.propsChange = function () {
        this.setTypeClass();
    };

    Tip.prototype.setTypeClass = function () {
        this.setState({
            typeClass: this.props.type ? ('type-' + this.props.type) : ''
        });
    };

    return createClass(v.Component, Tip, {
        getStyle: function () {
            return [
                '.tip{height:1.5rem;line-height:1.5rem;color:#fff;padding:.2rem;font-size:.9rem;}',
                '.tip.type-error{background:#d9534f;}',
                '.tip.type-info{background:#5bc0de;}',
                '.tip.type-success{background:#5cb85c;}'
            ].join('');
        }
    });
});
