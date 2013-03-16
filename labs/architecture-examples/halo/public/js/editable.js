define(['jqueryp!'], function ($) {
  // Constructor for toggling between editable label and input
  function Editable(item) {
    var $item = $(item);

    // When a toggle item is dblclicked, go into editing mode
    $item.on('dblclick', '.editable-toggle', function () {
      $item.addClass('editing');

      // Focus the item
      var $edit = $item.find('.edit');
      $edit.focus();

      // When the .edit field loses focus
      $edit.one('blur', function () {
        // Leave editing mode
        $item.removeClass('editing');

        // and fire an update event
        $item.trigger('editable-update', $item.val());
      });
    });
  }

  // Export Editable to jQuery
  $.exportModule('editable', Editable);

  return $;
});