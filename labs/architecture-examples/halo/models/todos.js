define(['Sauron', 'CrudModel'], function (Sauron, CrudModel) {
  var params = {
    'name': 'todos',
    'mixin': ['persist'],
    'load': function () {
      // If we have not loaded the todos, load them
      var todos = params.todos;
      if (!todos) {
        var todosStr = params.persist.get('todos') || '[]';
        todos = JSON.parse(todosStr);
      }

      // Return our todos
      return todos;
    },
    'save': function () {
      // If there are todos, save them
      var todos = params.todos;
      if (todos) {
        var todosStr = JSON.stringify(todos);
        params.persist.set('todos', todosStr);
      }
    },
    'create': function (todo, cb) {
      // Add our todo to the collection
      var todos = this.load();
      todos.unshift(todo);
      console.log(todos);

      // Save and fire an create event
      Sauron.model('todos').createEvent(todo);
    },
    'retrieve': function (cb) {
      var todos = this.load();
      cb(null, todos);
    }
  };
  return CrudModel(params);
});