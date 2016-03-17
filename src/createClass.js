/**
 * @file 类继承
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define(function (require) {
    var u = require('underscore');
    return function (superClass, subClass, staticProps) {
        staticProps = staticProps || {};
        superClass = superClass || Object;

        function F() {}
        F.prototype = superClass.prototype;
        var subClassPrevProto = subClass.prototype;
        subClass.prototype = new F();
        u.extend(subClass.prototype, subClassPrevProto);
        u.extend(subClass, staticProps);

        return subClass;
    };
});
