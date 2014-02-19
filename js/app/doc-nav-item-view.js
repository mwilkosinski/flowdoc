
define(
	[
		"jquery",
		"underscore",
		"backbone",
        "vent"
	],
	function ( $, _, BB, vent ) {
        "use strict";

		return BB.View.extend({

			tagName: "li",
            className: "menu-item",

            template: _.template( "<a class='menu-item-link' href='#page/<%= slug %>'><%= title %></a>" ),

            events: {
                "click .menu-item-link": "clickMenuItem"
            },

			render: function() {
				this.$el.html( this.template( this.model.attributes ));
				return this;
			},

            clickMenuItem: function(e) {
                e.preventDefault();
                vent.trigger("docNavMenuClick", this.model);
            },

            setActive: function() {
                this.$el.addClass("active").siblings().removeClass("active");
            }

		});
    }
);
