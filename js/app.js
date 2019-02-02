let totalWidth = $(".connecting-lines").width();
let selected = '';
let buttonPosition = 0;
let buttonAnchorLeft = 0;
let buttonAnchorTop = 0;
let svgAnchorTop = 276;
let svgHeight =  0;
let svgLine = '';

// DRAW LINE ON CLICK

$("button").click(function(){

	// Reset and select button
	$(".connecting-lines").empty();
	$("button").removeClass("selected");
	$(this).addClass("selected");
	selected = $('.selected');

	// Get co-ordinates
	buttonPosition = selected.position();
	buttonAnchorLeft = buttonPosition.left + 132;
	buttonAnchorTop = buttonPosition.top;

	// Calculate svg height
	svgHeight =  buttonAnchorTop - svgAnchorTop;

	// Insert svg
	svgLine = 	'<svg viewBox="0 0 ' + totalWidth + ' ' + svgHeight + '">' +
					'<polyline class="cls-1" points="122 0 122 25 ' + buttonAnchorLeft + ' 25 ' + buttonAnchorLeft  + ' ' + svgHeight + '"/>' +
				'</svg>';

	$( ".connecting-lines" ).append(svgLine);

	// Calculate svg path length
	let path = document.querySelector('.cls-1');
	let length = path.getTotalLength();

	// Add inline css for animation
	$(".cls-1").css({"stroke-dasharray": length, "stroke-dashoffset": - length});

});

// REFRESH LINE ON RESIZE

$(window).resize(function(){

	totalWidth = $(".connecting-lines").width();

	// Reset and select button
	$(".connecting-lines").empty();

	// Get co-ordinates
	buttonPosition = selected.position();
	buttonAnchorLeft = buttonPosition.left + 132;
	buttonAnchorTop = buttonPosition.top;

	// Calculate svg height
	svgHeight =  buttonAnchorTop - svgAnchorTop;

	// Insert svg
	svgLine = 	'<svg viewBox="0 0 ' + totalWidth + ' ' + svgHeight + '">' +
					'<polyline class="cls-1" points="122 0 122 25 ' + buttonAnchorLeft + ' 25 ' + buttonAnchorLeft  + ' ' + svgHeight + '"/>' +
				'</svg>';

	$( ".connecting-lines" ).append(svgLine);

});
