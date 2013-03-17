define(['Sauron', 'Builder', 'mvc!v/footer', 'HtmlController', 'mvc!m/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'footer',
        'start': function (todos, cb) {
          // Render our content and callback
          var completed = todos.filter(function (todo) {
                return todo.completed;
              }).length,
              data = {
                remaining: todos.length - completed,
                completed: completed
              },
              $html = Builder(tmpl, data);
          cb($html);
        }
      };

  return HtmlController(params);
});