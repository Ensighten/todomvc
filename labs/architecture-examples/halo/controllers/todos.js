define(['Builder', 'mvc!v/todos', 'HtmlController', 'mvc!m/todos'], function (Builder, tmpl, HtmlController) {
  var params = {
        'name': 'todos',
        'start': function (todos, cb) {
          console.log('hey');
          // Render our content and callback
          var $html = Builder(tmpl, {todos: todos});
          cb($html);
        }
      };

  return HtmlController(params);
});