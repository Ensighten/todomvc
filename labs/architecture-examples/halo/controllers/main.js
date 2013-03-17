define(['Sauron', 'Builder', 'mvc!v/main', 'HtmlController', 'mvc!m/todos', 'mvc!c/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'main',
        'start': function (cb) {
          // Grab the current todos
          Sauron.model('todos').retrieve(function (err, todos) {
            // Render our content
            var $html = Builder(tmpl),
                $todoList = $html.find('#todo-list'),
                $toggleAll = $html.find('#toggle-all');

            // When a new todo is submitted
            var $newTodo = $html.find('#new-todo');
            $newTodo.on('keypress', function (e) {
              var wasNotEnter = e.which !== 13,
                  val = $newTodo.val().trim();

              // If the keypress was not enter or there is no content, return
              if (wasNotEnter || !val) {
                return;
              }

              // Otherwise, create a new todo and clear out content
              Sauron.model('todos').create({'title': val});
              $newTodo.val('');
            });

            // Start up a child to handle the todos
            Sauron.start().controller('todos', $todoList, todos, function () {
              // Callback with the content
              cb($html);
            });

            // If there are no todos, hide toggle-all
            if (todos.length === 0) {
              $toggleAll.addClass('hidden');
            }

            // When there is a change, re-render the list
            function restartList() {
              // DEV: It is preferred to run these via async.parallel
              Sauron.stop().controller('todos', function () {
                Sauron.model('todos').retrieve(function (err, todos) {
                  // If there are todos, show toggleAll
                  if (todos.length) {
                    $toggleAll.removeClass('hidden');
                  } else {
                  // Otherwise, don't show toggleAll
                    $toggleAll.addClass('hidden');
                  }

                  // Start up the controller
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