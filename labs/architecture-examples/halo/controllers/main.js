/*global define*/
'use strict';

define(['Builder', 'HtmlController'], function (Builder, HtmlController) {
    var params = {
            'name': 'main',
            'start': function (cb) {
                console.log('oh hey');
                cb(Builder('<div>Hello world!</div>'));
            }
        };

    return HtmlController(params);
});