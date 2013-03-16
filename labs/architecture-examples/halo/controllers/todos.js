define(['Builder', 'mvc!v/todos', 'HtmlController', 'mvc!m/todos'], function (Builder, tmpl, HtmlController) {
  var params = {
        'name': 'todos',
        'start': function (todos, cb) {
          // Render our content and callback
          var $html = Builder(tmpl, {todos: todos});

          // When any todo is edited on, update the item

          cb($html);
        }
      };

  return HtmlController(params);
});