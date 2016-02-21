define({
    load: function (name, req, onload) {
        var url = req.toUrl(name);

        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
            onload(this.responseText);
        });
        xhr.addEventListener('error', function (error) {
            console.error(error);
        });
        xhr.open('GET', url);
        xhr.send();
    }
});
