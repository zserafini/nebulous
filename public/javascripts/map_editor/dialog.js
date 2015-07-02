$(function() {
  var dialog, form;

  var name = $( '#name' );
  var password = $( '#password' );
  var allFields = $( [] ).add( name ).add( password );

  function updateCoordinate() {
    $( '#users tbody' ).append( '<tr>' +
      '<td>' + name.val() + '</td>' +
      '<td>' + password.val() + '</td>' +
      '</tr>' );

    dialog.dialog( 'close' );
  }

  dialog = $( '#dialog-form' ).dialog({
    autoOpen: false,
         height: 400,
         width: 450,
         modal: true,
         buttons: {
           'Update Coordinate': updateCoordinate,
         Cancel: function() {
           dialog.dialog( 'close' );
         }
         },
         close: function() {
                  form[ 0 ].reset();
                  allFields.removeClass( 'ui-state-error' );
                }
  });

  form = dialog.find( 'form' ).on( 'submit', function( event ) {
    event.preventDefault();
    updateCoordinate();
  });

  $('#canvas').click(function() {
    coords = MapRenderer.getMapCoords(event, this);
    console.log(coords.x, coords.y);
    dialog.dialog( 'open' );
    $('.ui-dialog-title').html('Editing Coordinate: ' + coords.x + ', ' + coords.y);
    new_object = ObjectFactory.create_object('Water', { x: coords.x, y: coords.y });
    MapRenderer.drawObject(new_object);
  });
});
