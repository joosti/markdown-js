if (typeof define !== 'function') { var define = require('amdefine')(module) }
define(['../markdown_helpers', './dialect_helpers', './maruku', '../parser'], function (MarkdownHelpers, DialectHelpers, Maruku, Markdown) {

  var Ti = DialectHelpers.subclassDialect( Maruku ),
      extract_attr = MarkdownHelpers.extract_attr,
      forEach = MarkdownHelpers.forEach;

  // helper function
  function invalidBoundary(args, prev) {
      if (!args.wordBoundary && !args.spaceBoundary) { return; }
      var last = prev[prev.length - 1];
      if (typeof last !== "string") { return; }
      if (args.wordBoundary && (last.match(/(\w|\/)$/))) { return true; }
      if (args.spaceBoundary && (!last.match(/\s$/))) { return true; }
    }

  Ti.registerInline = function(start, fn) { this.inline[start] = fn; };
  Ti.inlineRegexp = function(args) {
    this.registerInline(args.start, function(text, match, prev) {
      if (invalidBoundary(args, prev)) { return; }
      args.matcher.lastIndex = 0;
      var m = args.matcher.exec(text);
      if (m) {
        var result = args.emitter.call(this, m);
        if (result) {
          return [m[0].length, result];
        }
      }
    });
  };

  Markdown.dialects.Ti = Ti;
//  Markdown.dialects.Ti.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;
//  Ti.buildBlockOrder ( Markdown.dialects.Maruku.block );
//  Ti.buildInlinePatterns( Markdown.dialects.Maruku.inline );

  return Ti;
});
