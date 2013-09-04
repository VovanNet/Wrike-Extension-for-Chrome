$( 'body' ).append( getLocal( "/html/content.html" ) );
var overlay = $( '#gpz' );
overlay.click( function( e ) { if( e.target == overlay[0] ) overlay.fadeOut(); } );
$( '#gpz #close' ).click( function() { overlay.fadeOut(); } );

$( '#create-desc-b').click( function() {
	$( '#gpz .content ' ).find( 'input[type=text],textarea' ).each( function() {
		$(this).after( $(this).val() );
		$(this).remove();
	});

		$('.instructions').remove();
	
	$( 'body', $( '[name=ace_inner]', $( '[name=ace_outer]' )[0].contentDocument )[0].contentDocument ).html( $('#gpz .content').html() );
	overlay.fadeOut();
});

$( document ).on( 'DOMSubtreeModified', '.menu-left', function(e) {
	if( $( '.info-description' ).prev().attr('id') == 'create-desc-f' || $( '.w3-task-liveeditor' ).prev().attr('id') == 'create-desc-f') return;
	$( '.info-description' ).before( ' <div id="create-desc-f"> Choose a template: <select> <option value="previousworksheet">Previous Quarter Worksheet</option><option value="upcomingworksheet">Upcoming Quarter Worksheet</option><option value="projectworksheet">Project Worksheet</option></select> <button class="btn" title="Create Description from Template">Create Description</button> </div>' );
	$( '.w3-task-liveeditor' ).before( ' <div id="create-desc-f"> Choose a template: <select> <option value="previousworksheet">Previous Quarterly Action Planning Worksheet</option><option value="upcomingworksheet">Upcoming Quarterly Action Planning Worksheet</option><option value="projectworksheet">Project Worksheet</option></select> <button class="btn" title="Create Description from Template">Create Description</button> </div>' );

	$( '#create-desc-f .btn' ).click( function() {
		overlay.fadeIn();
		var select = $( '#create-desc-f select' ).val();
		var form_content;
		if( select == 'previousworksheet' ) form_content = getLocal( '/html/form-previous.html' );
		else if( select == 'upcomingworksheet' ) form_content = getLocal( '/html/form-upcoming.html' );
		else form_content = getLocal( '/html/form-project.html' );
		$( '#gpz .content' ).html( form_content );
	} ); 	
});


function getLocal( url ) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", chrome.extension.getURL( url ) ,  false );
  xhr.send();
  return xhr.responseText;
}