
//
// The main application router
//

define(
	[
		"backbone",
		"vent",
		"state"
	],
	function (
		BB,
		vent,
		state
	) {

		"use strict";

		return BB.Router.extend({

			routes: {
				"page/:query": "setPageRoute"
			},

			setPageRoute: function( pageSlug ) {
				state.set("pageRoute", pageSlug);
				vent.trigger("pageRoute", pageSlug);
			},

			setPageRouteURL: function( pageSlug ) {
				this.navigate("page/" + pageSlug, {trigger: false});
			}
		});
	}
);
