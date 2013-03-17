define(['Builder', 'mvc!v/todos', 'HtmlController', 'mvc!m/todos'], function (Builder, tmpl, HtmlController) {
  var params = {
        'name': 'todos',
        'start': function (todos, cb) {
          // Render our content and callback
          var $html = Builder(tmpl, {todos: todos});

          // When any todo is edited on, update the item
          $html.on('editable-stop', function (e) {
            var $todo = $(e.target);

            // Get the item by its id
            var id = $todo.data('id');
            console.log(id);
          });

          cb($html);
        }
      };

  return HtmlController(params);
});