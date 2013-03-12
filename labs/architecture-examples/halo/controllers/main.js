define(['Sauron', 'Builder', 'mvc!v/main', 'HtmlController', 'mvc!m/todos', 'mvc!c/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'main',
        'start': function (cb) {
          // Grab the current todos
          console.log('aaa');
          Sauron.model('todos').retrieve(function (err, todos) {
            console.log('bbb');
            // Render our content
            var $html = Builder(tmpl),
                $todoList = $html.find('#todo-list');

            // Start up a child to handle the todos
            console.log('ccc');
            Sauron.start().controller('todos', $todoList, todos, function () {
              console.log('ddd');
              // Callback with the content
              cb($html);
            });
          });
        }
      };

  return HtmlController(params);
});