
define(
	[
		"jquery",
		"underscore",
		"backbone"
	],
	function ( $, _, BB ) {
        "use strict";

		return BB.View.extend({

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
