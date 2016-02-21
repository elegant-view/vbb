define([
    'backbone',
    'superagent',
    'promise'
], function (
    Backbone,
    superagent,
    Promise
) {
    return Backbone.Model.extend({
        post: function (url, params) {
            return new Promise(function (resolve, reject) {
                superagent.post(url)
                    .type('form')
                    .send(params)
                    .end(function (err, res) {
                        if (err) {
                            return reject(err);
                        }

                        resolve(res);
                    });
            });
        }
    });
});
