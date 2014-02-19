
define(
	[
		"backbone"
	],
	function ( BB ) {
		"use strict";

		return BB.Model.extend({

			defaults: {
				order: 0,
				title: "",
				slug: "",
				content: ""
			},

			getSlug: function() {
				if ( this.get("slug") === "" ) {
					this.generateSlug();
				}
				return this.get("slug");;
			},

			generateSlug: function() {
				var slug = this.get("title");
				slug = slug.toLowerCase();
                slug = slug.replace(/[^a-z0-9\s]/g, '');
                slug = slug.replace(/[_\s]/g, '-');
				this.set({slug: slug});
				return slug;
			}

		});

	}
);
