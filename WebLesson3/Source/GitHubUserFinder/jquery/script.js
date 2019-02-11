'use strict';

/**
 * Partial representation of a GitHub user.
 * @typedef {Object} User
 * @property {string} [name] - User's name might not be specified.
 * @property {string} login - Username.
 * @property {string} avatar_url - Profile image url.
 */

/**
 * The `getGitHubInfo()` request callback handler.
 * @callback UserRequestCallback
 * @param {Error} [error] - Optional. Specifies that an error has occurred.
 * @param {User} [user] - Optional. Found user details.
 */

/**
 * Create an instance of `XMLHttpRequest` class and send a GET request using it.
 * The function should finally return the object (it now contains the response!)
 *
 * If a `callback` is specified the request will be sent asynchronously.
 * Otherwise, the request is synchronous.
 *
 * @param {string} user - username of the user to lookup.
 * @param {UserRequestCallback} [callback] - Asynchronous callback.
 * @returns {XMLHttpRequest} - A request which has already been sent.
 */
function getGitHubInfo(user, callback) {
	var url = 'https://api.github.com/users/' + user;
	var async = (typeof callback === 'function');
	var request = new XMLHttpRequest();

	request.open('GET', url, async);
	if (async) {
		request.addEventListener('load', function () {
			var json = JSON.parse(this.responseText);
			if (this.status < 400) {
				// HTTP Status Code is not in the error range, assume success.
				// `json` is a `User` object.
				callback(null, json);
			} else {
				// `json` is an `Error` object.
				callback(json);
			}
		});
	}

	request.send();

	return request;
}

/**
 * Utility method to convert raw key values to a more human-readable format.
 *
 * @param {string} key - Raw key value.
 * @returns {string} - Human-readable formatted key.
 */
function titleCase(key) {
	var parts = key.split('_').map(function (part) {
		return part.charAt(0).toUpperCase() + part.slice(1);
	});
	return parts.join(' ');
}

/**
 * Sets the contents of the `h2` and the two `div` elements in `#profile` with the user's content.
 *
 * @param {User} user - GitHub user data.
 */
function showUser(user) {
	var profile = $('#profile');
	profile.children('h2').text(user.name || user.login);

	var image = $("#avatar-template").contents('img').clone().attr('src', user.avatar_url);
	profile.children('.avatar').html(image);

	var list = profile.children('.information');
	list.empty();

	var temp = $("#information-template").contents('tr');
	var entries = Object.entries(user);
	for (var i in entries) {
		var entry = entries[i];
		var key = entry[0], value = entry[1];
		var row = temp.clone();
		row.children('th').text(titleCase(key)).attr('data-key', key);
		if (value && key.indexOf("url") === key.length - 3) {
			var anchor = $('<a></a>').attr('href', value).text(value);
			row.children('td').html(anchor);
		} else {
			row.children('td').text(value === null ? 'N/A' : value);
		}
		list.append(row);
	}
}

/**
 * Reset the user profile.
 */
function reset() {
	$('#profile').children().empty();
}

/**
 * Set the elements such that a suitable message is displayed when the user lookup failed.
 *
 * @param {string} username - Value that was used to find a user.
 */
function noSuchUser(username) {
	reset();
	$('#profile h2').text('User "' + username + '" was not found.');
}

/**
 * Handle display updates when state has changed (by request, or by history).
 *
 * @param {State} [state] - The state object associated with the new history entry.
 */
function handleUserStateChange(state) {
	if (!state) {
		reset();
		return;
	}

	if (state.user) {
		// The request was successful show the user's details.
		showUser(state.user);
	} else {
		// Display a suitable error message.
		noSuchUser(state.username);
		console.error(state.error)
	}
}

/**
 * DOM is ready, add event handler.
 */
$(function () {

	handleUserStateChange(history.state);

	$('#username').on('keypress', function (event) {

		// Check if the `enter` (i.e. `return`) key is pressed.
		if (event.which === 13) {
			// Get what the user entered.
			var username = $(this).val();

			// Reset the text typed in the input.
			$(this).val("");

			// Get the user's information.
			getGitHubInfo(username, function (error, user) {
				var state = new State(username, user, error);

				// Store the response in the
				history.pushState(state, '', null);
				handleUserStateChange(state);
			});
		}

	});
});

/**
 * Called whenever the user navigates forward or back in history.
 *
 * @param {PopStateEvent} popStateEvent - event handler for the popstate event.
 */
window.onpopstate = function (popStateEvent) {
	if (!popStateEvent || !popStateEvent.state) {
		reset();
		return;
	}

	handleUserStateChange(popStateEvent.state);
};

/**
 * Class representing state to be stored in history.
 * @param {string} username - Lookup value used when state changed.
 * @param {User} [user] - Present only if lookup was successful.
 * @param {Error} [error] - Present only if lookup was **not** successful.
 * @constructor
 */
function State(username, user, error) {
	this.username = username;
	this.user = user;
	this.error = error;
}
