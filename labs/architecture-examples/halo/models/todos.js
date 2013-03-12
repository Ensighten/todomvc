define(['CrudModel'], function (CrudModel) {
  var params = {
    'name': 'todos',
    'mixins': ['persist'],
    'retrieve': function (cb) {

    }
  };
  return CrudModel(params);
});