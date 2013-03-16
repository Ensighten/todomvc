define(['Builder', 'jqueryp!editable', './persist.mixin.js', '/assets/handlebars.min.js'], function (Builder, $) {
  // Configure Builder to use handlebars
  var Handlebars = window.Handlebars;
  Builder.set('template engine', function (tmpl, data) {
    var tmplFn = Handlebars.compile(tmpl);
    return tmplFn(data);
  });

  // Add editable to be instantiated after render
  Builder.addPlugin('editable');

  // Configure mvc to load hdbs extensions
  require.config({
    'paths': {
      '_viewExt': '.hdbs'
    }
  });

  // Return a placeholder config
  return {};
});