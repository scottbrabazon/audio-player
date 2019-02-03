let browserWidth = $(window).width();
let totalWidth = $(".connecting-lines").width();
let totalHeight = $("#buttonContainer").height();
let wrapperMargin = $(window).width() / 10;
let selected = "";
let buttonPosition = 0;
let buttonAnchorLeft = 0;
let buttonAnchorTop = 0;
let svgAnchorTop = $(".now-playing").height() + 57;
let svgHeight =  0;
let svgLine = "";
const playButton = '<img class="play-icon" src="img/button-play.png" alt="Play">';
const pauseButton = '<img class="play-icon" src="img/button-pause.png" alt="Pause">';

function getCoordinates() {
	selected = $(".selected");
	buttonPosition = selected.position();
	buttonAnchorLeft = buttonPosition.left;
	buttonAnchorTop = buttonPosition.top;
};

function calculateSvgHeight() {
	svgHeight =  buttonAnchorTop - svgAnchorTop;
}

function drawLineDesktop() {
	$(".connecting-lines").removeAttr("style");
	getCoordinates();
	buttonAnchorLeft = (buttonPosition.left + 85) - wrapperMargin;
	calculateSvgHeight();
	svgLine = 	'<svg viewBox="0 0 ' + totalWidth + ' ' + svgHeight + '">' +
					'<polyline class="cls-1" points="122 0 122 25 ' + buttonAnchorLeft + ' 25 ' + buttonAnchorLeft  + ' ' + svgHeight + '"/>' +
				'</svg>';

	$(".connecting-lines").append(svgLine);
};

function drawLineMobile() {
	getCoordinates();
	calculateSvgHeight();
	svgHeight = svgHeight + 14;
	svgLine = 	'<svg viewBox="0 0 ' + buttonAnchorLeft + ' ' + svgHeight + '">' +
					'<polyline class="cls-1" points="' + buttonAnchorLeft + ' ' + svgHeight + ' 0.5 ' + svgHeight + ' 0.5 0"/>' +
				'</svg>';

	let buttonAnchorLeftPixels = buttonAnchorLeft + "px";
	$(".connecting-lines").css({"width": buttonAnchorLeftPixels, "height": totalHeight});
	$(".connecting-lines").append(svgLine);
};

// DRAW LINE ON CLICK

$("button").click(function(){

	// Reset and select button
	$("button").children("img").replaceWith(playButton);
	$(".connecting-lines").empty();
	$("button").removeClass("selected");
	$(this).addClass("selected");

	// Replace play icon
	$(this).children("img").remove();
	$(this).prepend(pauseButton);

	// Decide which line to draw
	browserWidth = $(window).width();

	if (browserWidth < 512) {
		drawLineMobile();
	} else {
		drawLineDesktop();
	}

	// Calculate svg path length
	let path = document.querySelector(".cls-1");
	let length = path.getTotalLength();

	// Add inline css for animation
	if (browserWidth < 512) {
		$(".cls-1").css({"stroke-dasharray": length, "stroke-dashoffset": - length});
	} else {
		$(".cls-1").css({"stroke-dasharray": length, "stroke-dashoffset": length});
	}

});

// REFRESH LINE ON RESIZE

$(window).resize(function(){

	totalWidth = $(".connecting-lines").width();
	wrapperMargin = $(window).width() / 10;

	// Reset line
	$(".connecting-lines").empty();

	// Decide which line to draw
	browserWidth = $(window).width();

	if ($("button").hasClass("selected")) {
		if (browserWidth < 512) {
		drawLineMobile();
		} else {
			drawLineDesktop();
		}
	};
});
