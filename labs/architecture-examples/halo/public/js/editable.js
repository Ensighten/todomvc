define(['jqueryp!'], function ($) {
  // Constructor for toggling between editable label and input
  function Editable(item) {
    var $item = $(item);

    // When a toggle item is dblclicked, go into editing mode
    $item.on('dblclick', '.editable-toggle', function () {
      $item.addClass('editing');

      // When the .edit field loses focus
      $item.once('blur', '.edit', function () {
        // Leave editing mode
        $item.removeClass('editing');

        // and fire an update event
        $item.trigger('editable-update', $item.val());
      });
    });
  }

  return $;
});