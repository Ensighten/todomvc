define(['Sauron', 'Builder', 'mvc!v/footer', 'HtmlController', 'mvc!m/todos', 'mvc!m/state'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'footer',
        'start': function (todos, cb) {
          // Render our content
          var completedTodos = todos.filter(function (todo) {
                return todo.completed;
              }),
              completed = completedTodos.length,
              data = {
                remaining: todos.length - completed,
                completed: completed
              },
              $html = Builder(tmpl, data),
              $clearCompleted = $html.filter('#clear-completed');

          // When any of the footer links are clicked, update the state
          $html.on('radio-select', '.radio-item', function () {
            var $a = $(this),
                filter = $a.data('filter');
            Sauron.model('state').update({filter: filter});
          });

          // When the clear completed button is clicked
          $clearCompleted.on('click', function () {
            // Delete each of the completed todos
            completedTodos.forEach(function (todo) {
              Sauron.model('todos')['delete'](todo);
            });
          });

          // Callback with content
          cb($html);
        }
      };

  return HtmlController(params);
});