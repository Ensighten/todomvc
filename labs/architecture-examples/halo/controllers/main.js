/*global define*/
'use strict';

define(['Builder', 'mvc!v/todos', 'HtmlController'], function (Builder, HtmlController) {
    var params = {
            'name': 'main',
            'start': function (cb) {
                var $html = Builder('<div>Hello world!</div>');
                cb($html);
            }
        };

    return HtmlController(params);
});