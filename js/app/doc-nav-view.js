
define(
	[
		"jquery",
		"underscore",
		"backbone",
		"app/doc-nav-item-view"
	],
	function ( $, _, BB, DocNavItemView ) {
		"use strict";

		return BB.View.extend({

			tagName: "ul",
			className: "doc-nav-menu",
            itemViews: [],

			render: function() {

				this.collection.each(function(item) {
					var itemView = new DocNavItemView({ model: item });
                    this.itemViews.push( itemView );
					this.$el.append( itemView.render().el );
				}, this);

				return this;
			},

            setPageActive: function( index ) {
                this.itemViews[index].setActive();
            }

		});

	}
);
