define(['Sauron', 'Builder', 'mvc!v/footer', 'HtmlController', 'mvc!m/todos', 'mvc!m/state'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'footer',
        'start': function (todos, cb) {
          // Render our content
          var completed = todos.filter(function (todo) {
                return todo.completed;
              }).length,
              data = {
                remaining: todos.length - completed,
                completed: completed
              },
              $html = Builder(tmpl, data);

          // When any of the footer links are clicked, update the state
          $html.on('click', 'a', function () {
            var $a = $(this),
                filter = $a.data('filter');
            Sauron.model('state').update({filter: filter});
          });

          // Callback with content
          cb($html);
        }
      };

  return HtmlController(params);
});