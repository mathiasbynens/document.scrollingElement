/*! https://mths.be/scrollingelement v0.0.0 by @diegoperini & @mathias | MIT license */
if (!('scrollingElement' in document)) {
	document.scrollingElement = (function() {
		var html = document.documentElement;
		var body = document.body;
		// Note: `document.body` could be a `frameset` element, or `null`.
		// `tagName` is uppercase in HTML, but lowercase in XML.
		var isFrameset = body && !/body/i.test(body.tagName);
		if (
			html.scrollHeight > body.scrollHeight &&
			/^CSS1/.test(document.compatMode)
		) {
			return html;
		}
		return isFrameset ? null : body;
	}());
}
