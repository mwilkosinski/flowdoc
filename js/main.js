"use strict";

require.config({
	urlArgs: "bust=" + (new Date()).getTime(),
	paths: {
		config:	    "config",
		jquery:	    "lib/jquery-1.11.0.min",
		underscore: "lib/underscore-min",
		backbone:   "lib/backbone-min",
		text:	    "lib/require.text",
        marked:	    "lib/marked",
		state:	    "app/app-state",
		vent:	    "app/app-event-aggregator"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(
	[
		"backbone",
		"config",
		"app/app-router",
		"app/app-view",
		"app/doc-nav-view",
		"app/content-view",
		"app/pages-collection"
	],
	function (
		BB,
		Config,
		AppRouter,
		AppView,
		DocNavView,
		ContentView,
		PagesCollection
	) {
        "use strict";

        var pages, appView, appRouter;

        appRouter = new AppRouter();
        BB.history.start();

        pages = new PagesCollection( [], { pagesConfig: Config.pages } );

		appView = new AppView({
            router: appRouter,
            docNavView: new DocNavView( { collection: pages } ),
            contentView: new ContentView(),
            pages: pages
        });
        
		appView.render();
	}
);
