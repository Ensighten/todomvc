define(['Sauron', 'Builder', 'mvc!v/main', 'HtmlController', 'mvc!m/todos', 'mvc!c/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'main',
        'start': function (cb) {
          // Grab the current todos
          Sauron.model('todos').retrieve(function (err, todos) {
            // Render our content
            var $html = Builder(tmpl),
                $todoList = $html.find('#todo-list');

            // When a new todo is submitted
            var $newTodo = $html.find('#new-todo');
            $newTodo.on('keypress', function (e) {
              var wasNotEnter = e.which !== 13,
                  val = $newTodo.val().trim();

              // If the keypress was not enter or there is no content, return
              if (wasNotEnter || !val) {
                return;
              }

              // Otherwise, create a new todo
              Sauron.model('todos').create({'value': val});
            });

            // Start up a child to handle the todos
            Sauron.start().controller('todos', $todoList, todos, function () {
              // Callback with the content
              cb($html);
            });

            // When there is a change, re-render the list
            function restartList() {
              // DEV: It is preferred to run these via async.parallel
              Sauron.stop().controller('todos', function () {
                Sauron.model('todos').retrieve(function (err, todos) {
                  Sauron.start().controller('todos', $todoList, todos);
                });
              });
            }
            Sauron.model('todos').on().createEvent(restartList);
            Sauron.model('todos').on().updateEvent(restartList);
            Sauron.model('todos').on().deleteEvent(restartList);
          });
        }
      };

  return HtmlController(params);
});