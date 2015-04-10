/*! https://mths.be/scrollingelement v1.2.0 by @diegoperini & @mathias | MIT license */
if (!('scrollingElement' in document)) (function() {

	var html = document.documentElement;
	var isCompliant = false;
	var isStandardsMode = /^CSS1/.test(document.compatMode);

	if (isStandardsMode) {
		var iframe = document.createElement('iframe');
		iframe.style.height = '1px';
		(document.body || html).appendChild(iframe);
		var doc = iframe.contentWindow.document;
		doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
		doc.close();
		isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight;
		iframe.parentNode.removeChild(iframe);
	}

	var scrollingElement = function() {
		var body = document.body;
		if (isCompliant) { // Note: this is `isStandardsMode && isCompliant`.
			return html;
		}
		// Note: `document.body` could be a `frameset` element, or `null`.
		// `tagName` is uppercase in HTML, but lowercase in XML.
		var isFrameset = body && !/body/i.test(body.tagName);
		return isFrameset ? null : body;
	};

	if ('defineProperty' in Object) {
		// Support modern browsers that lack a native implementation.
		Object.defineProperty(document, 'scrollingElement', {
			'get': scrollingElement
		});
	} else if ('__defineGetter__' in document) {
		// Support Firefox ≤ 3.6.9, Safari ≤ 4.1.3.
		document.__defineGetter__('scrollingElement', scrollingElement);
	} else if ('attachEvent' in document) {
		// Support IE ≤ 7.
		document.scrollingElement = scrollingElement();
		document.attachEvent('onpropertychange', function() {
			// A `propertychange` event fires when `<body>` is parsed because
			// `document.activeElement` then changes.
			if (window.event.propertyName == 'activeElement') {
				document.scrollingElement = scrollingElement();
			}
		});
	}

}());
