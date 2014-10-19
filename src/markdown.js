if (typeof define !== 'function') { var define = require('amdefine')(module) }

// Include all our dependencies and return the resulting library.

define(['./parser', './markdown_helpers', './render_tree', './dialects/gruber', './dialects/maruku', './dialects/tidialect'], function(Markdown) {
  return Markdown;
});
