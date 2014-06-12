# FlowDoc

FlowDoc is a simple and lightweight tool for creating [style guides](http://alistapart.com/article/creating-style-guides) and project documentation. It builds a simple website from a bunch of text files written in markdown format.

## How to use

There is a small example of styleguide in the `example` folder which you can use as reference or starting point:

1. Add your markdown files to the `pages` directory
2. Edit the file `config.json` adding the file name and a title for each of your markdown files (the title will appear in the navigation menu).

Please note, FlowDoc must be served from a HTTP server, it will _NOT_ work locally opened as `file:///...`.

## Under the bonnet

For those interested in the inner workings of FlowDOC, it's been written in [Backbone.js](http://backbonejs.org/) and uses [RequireJS](http://requirejs.org/) for modular architecture.