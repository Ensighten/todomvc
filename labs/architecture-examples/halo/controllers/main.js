/*global define*/
'use strict';

console.log('oh hey');
define(['Builder', 'HtmlController'], function (Builder, HtmlController) {
    var $ = Builder.$,
        params = {
        'start': function (cb) {
            console.log('oh hey');
            cb($('<div>Hello world!</div>'));
        }
    };

    return HtmlController(params);
});