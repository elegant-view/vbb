/**
 * @file Model基类
 * @author yibuyisheng(yibuyisheng@163.com)
 */

define(function (require) {
    var Backbone = require('backbone');
    var superagent = require('superagent');
    var Promise = require('promise');

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
