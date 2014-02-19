define(
	[
		"jquery",
		"backbone",
        "vent",
        "state"
	],
	function ( $, BB, vent, state ) {
		"use strict";

		return BB.View.extend({

			el: "#flowdoc",

			docNavView: null,
			contentView: null,
			pages: null,
			router: null,

			initialize: function (options) {

				this.docNavView = options.docNavView;
				this.contentView = options.contentView;
				this.pages = options.pages;
				this.router = options.router;

				this.pages.loadAll();

				this.listenTo( vent, "pagesLoading", function(){
					//console.log("pages loading");
				});

				this.listenTo( vent, "pagesLoaded", function(){

                    this.docNavView.render();

                    // Check if pageRoute is set in the app state object
                    if ( state.isset("pageRoute") ) {
                        var pageSlug = state.get("pageRoute");
                        // Unset route in state
                        state.unset("pageRoute");
                        // Execute the page route
                        this.goToPage( this.pages.getPageIndexBySlug(pageSlug) );
                    } else {
                        // Execute default route
                        this.goToPage(0);
                    }

				});

				this.listenTo( vent, "docNavMenuClick", function( page ){
                    this.goToPage( page.get("order") );
				});

                this.listenTo( vent, "pageRoute", function() {
                    // Check in the state state if pages have been loaded
                    if ( state.isset("pagesLoaded") ) {
                        var pageSlug = state.get("pageRoute");
                        // Unset route in state
                        state.unset("pageRoute");
                        // Execute the page route
                        this.goToPage( this.pages.getPageIndexBySlug(pageSlug) );
                    }
                });
			},

			render: function() {

				this.$("#doc-nav").append( this.docNavView.el );
				this.$("#content").append( this.contentView.el );

				return this;
			},

			goToPage: function( index ) {
                this.router.setPageRouteURL( this.pages.getPageSlug(index) );
                this.docNavView.setPageActive(index);
                this.contentView.render( this.pages.getPageContent(index) );
            }
		});
	}
);
