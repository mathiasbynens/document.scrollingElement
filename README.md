# `document.scrollingElement`

A polyfill for [`document.scrollingElement` as defined in the CSSOM specification](http://dev.w3.org/csswg/cssom-view/#dom-document-scrollingelement).

## Installation

In an HTML document:

```html
<script src="scrollingelement.js"></script>
```

It’s recommended to place this right before the closing `</body>` tag.

The polyfill can be used in `frameset` HTML documents (in that case, place the `<script>` in the `<head>`) or in XML documents as well.

## Browser support

The polyfill has been tested in the following browsers:

* Chrome
* Opera 11.64+
* Firefox 3.5+
* Internet Explorer 8+ (but [should work even in older versions](https://github.com/mathiasbynens/document.scrollingElement/issues/4))
* Safari 8+ (but [should work even in Safari 4](https://github.com/mathiasbynens/document.scrollingElement/issues/5))

## Acknowledgements

Thanks to [Diego Perini](https://github.com/dperini) ([@diegoperini](https://twitter.com/diegoperini)) for [his `getScrollingElement` implementation](https://gist.github.com/dperini/ac3d921d6a08f10fd10e), and for allowing me to re-use it as part of this polyfill.

## Authors

This polyfill was written by [Mathias Bynens](https://mathiasbynens.be/) and [Simon Pieters](https://simon.html5.org/), with help from [contributors](https://github.com/mathiasbynens/document.scrollingElement/graphs/contributors).

## License

This project is available under the [MIT](https://mths.be/mit) license.
