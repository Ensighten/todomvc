define(['Sauron', 'Builder', 'mvc!v/main', 'HtmlController', 'mvc!m/todos'], function (Sauron, Builder, tmpl, HtmlController) {
  var params = {
        'name': 'main',
        'start': function (cb) {
          // Grab the current todos
          Sauron.model('todos').retrieve(function (err, todos) {
            // Ignore error in this case
            var $html = Builder(tmpl);
            cb($html);
          });
        }
      };

  return HtmlController(params);
});