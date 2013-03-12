/*global define*/
'use strict';

define(['Builder', 'mvc!v/todos', 'HtmlController'], function (Builder, tmpl, HtmlController) {
    var params = {
            'name': 'main',
            'start': function (cb) {
                var $html = Builder(tmpl);
                cb($html);
            }
        };

    return HtmlController(params);
});