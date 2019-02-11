'use strict';

/**
 * An array of colors and assign it to a variable colors.
 * @type {string[]}
 */
var colors = [
	"#22ac5e",
	"#d68236",
	"#71b5c2",
	"#af2655",
	"#b34de7",
	"#e6bd01",
	"#104393",
	"#ca4d94",
	"#4a772d",
	"#c180a7",
	"#958112",
	"#8d2f8d"
];

/**
 * Sets the preview color to the one entered in the input and display its color code using setPreviewColor function
 * @param color
 */
function setPreviewColor(color) {
	var preview = $('.preview');
	preview.css('background-color', color);
	$('.color-code').text(preview.css('background-color'));
}

/**
 * Adds color boxes to the favorite colors
 * @param {string} color - CSS color value
 */
function addBox(color) {
	var item = $("#colors template").contents('div').clone();
	item.css('background-color', color);
	$('#colors').prepend(item);
	item.removeClass('added');
	window.requestAnimationFrame(function () {
		item.addClass('added');
	});
}

$(function () {

	// Add each color in the colors array to the div '#colors'
	colors.forEach(addBox);

	// Set the preview color to one of the colors in the colors array randomly
	setPreviewColor(colors[Math.floor(Math.random() * colors.length)]);

	// An event handler for the key up event i.e. when the user types the color in the input and releases the key on the keyboard
	$('#color').on('keydown keyup keypress', function () {
		var color = $(this).val();
		// Set the preview color to the color typed in the input
		setPreviewColor(color);
	});

	// An event handler to handle the click the event on the add to favorite button
	$('#add-to-favorite').on('click', function () {
		var color = $('#color');
		// the color gets added to the list of favorite colors
		if (color.val()) {
			addBox(color.val());
			// the content of the input gets cleared
			color.val('');
			//  and the focus gets back on the input
			color.focus();
		}
	});

	// An event handler to handle any item in the favorite colors is clicked or hovered
	$('#colors').on('click mouseover', '.item', function () {
		// the color gets displayed in the preview div
		setPreviewColor($(this).css('background-color'));
	});
});
