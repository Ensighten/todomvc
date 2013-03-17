define(['Sauron', 'Builder', 'mvc!v/footer', 'HtmlController', 'mvc!m/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'footer',
        'start': function (todos, cb) {
          // Render our content and callback
          var $html = Builder(tmpl, {todos: todos});
          console.log('hey');
          cb($html);
        }
      };

  return HtmlController(params);
});