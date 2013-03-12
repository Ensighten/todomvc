define(['Builder', '/assets/handlebars.min.js'], function (Builder, handlebars) {
  // Configure Builder to use handlebars
  var handlebars = window.handlebars;
  Builder.set('template engine', handlebars);

  // Configure mvc to load hdbs extensions
  require.config({
    'viewExt': '.hdbs'
  });

  // Return a placeholder config
  return {};
});