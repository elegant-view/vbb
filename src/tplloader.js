/**
 * @file 模板加载插件
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define({
    load: function (name, req, onload) {
        var url = req.toUrl(name);

        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            onload(this.responseText);
        });
        xhr.addEventListener('error', function (error) {
            throw error;
        });
        xhr.open('GET', url);
        xhr.send();
    }
});
