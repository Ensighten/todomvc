define(['Sauron', 'Builder', 'mvc!v/main', 'HtmlController', 'mvc!m/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'main',
        'start': function (cb) {
          // Grab the current todos
          Sauron.model('todos').retrieve(function (err, todos) {
            // Render our content
            var $html = Builder(tmpl),
                $todoList = $html.find('#todo-list');

            // Start up a child to handle the todos
            Sauron.start().controller('todos', $todoList, todos, function () {
              // Callback with the content
              cb($html);
            });
          });
        }
      };

  return HtmlController(params);
});