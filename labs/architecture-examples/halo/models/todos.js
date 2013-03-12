define(['CrudModel'], function (CrudModel) {
  var params = {
    'name': 'todos',
    'mixin': ['persist'],
    'retrieve': function (cb) {
      var todosStr = params.persist.get('todos') || '[]',
          todos = JSON.parse(todosStr);
      cb(null, todos);
    }
  };
  return CrudModel(params);
});