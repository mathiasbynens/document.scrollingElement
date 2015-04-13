(function(root) {
	'use strict';

	var frameDoc = document.getElementsByTagName('iframe')[0].contentDocument;

	function isStandardsMode() {
		return /^CSS1/.test(document.compatMode);
	}

	function documentWritePreserveQunit(willBeStandardsMode) {
		var htmlPrefix = willBeStandardsMode ? '<!DOCTYPE html>' : '<!-- no doctype = quirks mode -->';
		var origDocElem = document.documentElement;
		var headHTML = document.head.innerHTML;
		var qunitDiv = document.getElementById('qunit');
		document.close(); // Just in case…
		document.open();
		document.write(htmlPrefix + '<html><head>' + headHTML + '</head><body></body></html>');
		document.close();
		document.body.appendChild(qunitDiv);

		// Sanity check.
		ok(document.documentElement !== origDocElem, '<html> should have been replaced.');
		if (willBeStandardsMode) {
			ok(isStandardsMode(), 'document should have been switched to standards mode.');
		} else {
			ok(!isStandardsMode(), 'document should have been switched to quirks mode.');
		}
	}

	// Note: we cannot *really* test standards mode, as WebKit & Blink violate the
	// spec and return `BODY` anyway, and our polyfill is supposed to mimic that.
	if (isStandardsMode()) {
		test('In standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`', function() {
			ok(
				document.scrollingElement === document.body ||
				document.scrollingElement === document.documentElement,
				'In standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`, but we’ll accept `BODY` too because that’s what WebKit/Blink use. Actual result: ' + document.scrollingElement.tagName
			);
		});
		test('In standards mode in a frameset document, the scrolling element is supposed to be `HTML`', function() {
			ok(
				frameDoc.scrollingElement === frameDoc.documentElement ||
				frameDoc.scrollingElement === null,
				'[flaky test; retry as needed] In standards mode in a frameset document, the scrolling element is supposed to be `HTML`, but we’ll accept `null` too because that’s what it should be in WebKit/Blink. Actual result: ' + frameDoc.scrollingElement
			);
		});
		test('after switching to quirks mode in a non-frameset document, the scrolling element is `BODY`', function() {
			documentWritePreserveQunit(false);
			strictEqual(
				document.scrollingElement,
				document.body,
				'After switching to quirks mode in a non-frameset document, the scrolling element is `BODY`'
			);
		});
	} else { // Not standards mode; Quirks mode.
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
				'[flaky test; retry as needed] In quirks mode in a frameset document, the scrolling element is `null`'
			);
		});
		test('after switching to standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`', function() {
			documentWritePreserveQunit(true);
			ok(
				document.scrollingElement === document.body ||
				document.scrollingElement === document.documentElement,
				'After switching to standards mode in a non-frameset document, the scrolling element is supposed to be `HTML`, but we’ll accept `BODY` too because that’s what WebKit/Blink use. Actual result: ' + document.scrollingElement.tagName
			);
		});
	}

}(this));
