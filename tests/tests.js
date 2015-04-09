(function(root) {
	'use strict';

	var frameDoc = document.getElementsByTagName('iframe')[0].contentDocument;
	var isStandardsMode = /^CSS1/.test(document.compatMode);
	var isQuirksMode = !isStandardsMode;
	// Note: we cannot *really* test standards mode, as WebKit & Blink violate the
	// spec and return `BODY` anyway, and our polyfill is supposed to mimic that.
	if (isStandardsMode) {
		test('In standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`', function() {
			ok(
				/HTML|BODY/.test(document.scrollingElement.tagName),
				'In standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`, but we’ll accept `BODY` too because that’s what WebKit/Blink use'
			);
		});
		test('In standards mode in a frameset document, the scrolling element is `null`', function() {
			strictEqual(
				frameDoc.scrollingElement,
				null,
				'In standards mode in a frameset document, the scrolling element is `null`'
			);
		});
	}
	if (isQuirksMode) {
		test('In quirks mode in a non-frameset document, the scrolling element is `BODY`', function() {
			strictEqual(
				document.scrollingElement,
				document.body,
				'In quirks mode in a non-frameset document, the scrolling element is `BODY`'
			);
		});
		test('In quirks mode in a frameset document, the scrolling element is `null`', function() {
			strictEqual(
				frameDoc.scrollingElement,
				null,
				'In quirks mode in a frameset document, the scrolling element is `null`'
			);
		});
	}

}(this));
