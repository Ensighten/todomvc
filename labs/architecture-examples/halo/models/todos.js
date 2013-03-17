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
        params.todos = todos;
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
      var todos = this.load(),
          id = todos.length;

      // Update the todo's id
      todo.id = id;
      todos.unshift(todo);

      // Save and fire an create event
      this.save();
      Sauron.model('todos').createEvent(todo);
    },
    'retrieve': function (cb) {
      var todos = this.load();
      cb(null, todos);
    },
    'update': function (_todo, cb) {
      // Find the todo
      var todos = this.load(),
          id = _todo.id,
          todo = todos.filter(function (todo) {
            return todo.id === id;
          })[0];

      // Copy over attributes
      var keys = Object.getOwnPropertyNames(_todo);
      keys.forEach(function (key) {
        todo[key] = _todo[key];
      });

      // Save and fire an update event
      this.save();
      Sauron.model('todos').updateEvent(todo);
    },
    'delete': function (todo, cb) {
      // Find the todo index
      var todos = this.load(),
          index = todos.indexOf(todo);

      // Remove it
      todos.splice(index, 0);

      // Save and fire an delete event
      this.save();
      Sauron.model('todos').deleteEvent(todo);
    }
  };
  return CrudModel(params);
});