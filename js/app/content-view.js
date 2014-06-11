
//
// The main page content view
//

define(
	[
		"jquery",
		"underscore",
		"backbone"
	],
	function (
		$,
		_,
		BB
	) {

		"use strict";

		return BB.View.extend({

			tagName: "div",
			className: "flowdoc-content",

			render: function( content ) {

				var element = this.$el;

				element.hide( 0, function(){
					element.html( content ).fadeIn();
					return this;
				});
			}

		});
	}
);
