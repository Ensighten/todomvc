define(['Builder', '/assets/handlebars.min.js'], function (Builder, handlebars) {
  // Configure Builder to use handlebars
  var handlebars = window.handlebars;
  Builder.set('template engine', function (tmpl, data) {
    var tmplFn = handlebars.compile(tmpl);
    return tmplFn(data);
  });

  // Configure mvc to load hdbs extensions
  require.config({
    'paths': {
      '_viewExt': '.hdbs'
    }
  });

  // Return a placeholder config
  return {};
});