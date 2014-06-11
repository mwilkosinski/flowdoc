
//
// Collection of page models
//

define(
	[
		"jquery",
		"backbone",
		"marked",
		"vent",
		"state",
		"app/page-model"
	],
	function (
		$,
		BB,
		marked,
		vent,
		state,
		PageModel
	) {

		"use strict";

		return BB.Collection.extend({

			model: PageModel,
			comparator: "order",
			pagesConfig: [],

			initialize: function( models, options ) {
				this.pagesConfig = options.pagesConfig;
			},

			loadAll: function() {

				var requests = [];

				vent.trigger("pagesLoading");

				for (var i = 0; i < this.pagesConfig.length; i++) {
					requests.push(
						this.loadPage( this.pagesConfig[i], i )
					);
				}

				$.when.apply(null, requests)
					.done(function(){
						state.set("pagesLoaded", true);
						vent.trigger("pagesLoaded");
					})
					.fail(function(){
						alert('loading error');
					});
			},

			loadPage: function( page, order ) {

				var self = this;

				return $.ajax({
					url: "content/" + page.file,
					dataType: "text",
					cache: false
				}).done(function ( pageContent ) {
					var pageModel = new PageModel({
						title: page.title,
						order: order,
						content: self.parseMarkdown( pageContent )
					});
					pageModel.generateSlug();
					self.add( pageModel );
				});
			},

			parseMarkdown: function( content ) {
				content = marked( content );
				content = content.replace("[flowdoc_example]", "<div class='flowdoc-example'>", "g")
				content = content.replace("[/flowdoc_example]", "</div>", "g")
				return content;
			},

			getPageContent: function( index ) {
				return this.at(index).get("content");
			},

			getPageSlug: function( index ) {
				return this.at(index).get("slug");
			},

			getPageIndexBySlug: function( slug ) {
				var page = this.findWhere({ slug: slug });
				return page.get("order");
			}

		});
	}
);
