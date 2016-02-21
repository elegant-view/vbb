define(['underscore'], function (u) {
    return function (superClass, subClass, staticProps) {
        staticProps = staticProps || {};
        superClass = superClass || Object;

        var prevSubClassProto = subClass.prototype;
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        u.extend(subClass.prototype, prevSubClassProto);

        for (var key in staticProps) {
            subClass[key] = staticProps[key];
        }

        return subClass;
    };
});
