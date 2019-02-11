'use strict';

/**
 * An array of colors and assign it to a variable colors.
 * @type {string[]}
 */
const colors = [
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
	const preview = document.querySelector('.preview');
	setBackgroundColor(preview, color);
	document.querySelector('.color-code').textContent = getBackgroundColor(preview);
}

/**
 * Adds color boxes to the favorite colors
 * @param {string} color - CSS color value
 */
function addBox(color) {
	const item = document.querySelector('#colors template').content.cloneNode(true).querySelector('div');
	setBackgroundColor(item, color);
	document.querySelector('#colors').prepend(item);
	item.classList.remove('added');
	window.requestAnimationFrame(() => {
		item.classList.add('added');
	});
}

ready(() => {

	// Add each color in the colors array to the div '#colors'
	colors.forEach(addBox);

	// Set the preview color to one of the colors in the colors array randomly
	setPreviewColor(colors[Math.floor(Math.random() * colors.length)]);

	// An event handler for the key up event i.e. when the user types the color in the input and releases the key on the keyboard
	listen(document.querySelector('#color'), 'keydown keyup keypress', event => {
		const color = event.target.value;
		// Set the preview color to the color typed in the input
		setPreviewColor(color);
	});

	// An event handler to handle the click the event on the add to favorite button
	listen(document.querySelector('#add-to-favorite'), 'click', () => {
		const color = document.querySelector('#color');
		// the color gets added to the list of favorite colors
		if (color.value) {
			addBox(color.value);
			// the content of the input gets cleared
			color.value = '';
			//  and the focus gets back on the input
			color.focus();
		}
	});

	// An event handler to handle any item in the favorite colors is clicked or hovered
	delegate(document.querySelector('#colors'), 'click mouseover', '.item', event => {
		setPreviewColor(getBackgroundColor(event.target));
	});
});

function ready(eventHandler) {
	if (document.readyState === "loading") {
		document.addEventListener('DOMContentLoaded', eventHandler)
	} else {
		eventHandler();
	}
}

function listen(elem, eventTypes, listener) {
	eventTypes.split(" ").forEach(eventType => {
		elem.addEventListener(eventType, listener);
	});
}

function delegate(elem, eventTypes, selector, listener) {
	listen(elem, eventTypes, event => {
		const selected = event.target.closest(selector);
		if (!selected) {
			return;
		}
		listener.call(selected, event);
	});
}

function getBackgroundColor(elem) {
	const win = elem.ownerDocument.defaultView;
	return win.getComputedStyle(elem, null).backgroundColor;
}

function setBackgroundColor(elem, newValue) {
	elem.style.backgroundColor = newValue;
}
