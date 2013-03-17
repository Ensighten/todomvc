define(['Sauron', 'Builder', 'mvc!v/todos', 'HtmlController', 'mvc!m/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'todos',
        'start': function (todos, cb) {
          // Render our content and callback
          var $html = Builder(tmpl, {todos: todos});

          // Create helper for finding todo
          function getTodoBy$Todo($todo) {
            // Get the item by its id
            var id = +$todo.data('id'),
                todo = todos.filter(function (todo) {
                  return todo.id === id;
                })[0];
            return todo;
          }

          // When any todo is edited on, update the item
          $html.on('editable-stop', function (e) {
            var $todo = $(e.target),
                val = $todo.editable('val'),
                todo = getTodoBy$Todo($todo);

            // Update its value and update it via the model
            todo.title = val;
            Sauron.model('todos').update(todo);
          });

          // When a toggle is clicked
          $html.on('click', '.toggle', function () {
            // Find the target todo
            var $checkbox = $(this),
                $todo = $checkbox.closest('.todo'),
                todo = getTodoBy$Todo($todo);

            // Update its status to completed
            todo.completed = $checkbox.prop('checked');
            Sauron.model('todos').update(todo);
          });

          // Callback with content
          cb($html);
        }
      };

  return HtmlController(params);
});