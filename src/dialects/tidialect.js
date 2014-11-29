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

  Ti.inlineRegexp({
    start: '$',
    matcher: /(\$)([\S\s]+)(\$)/,
    emitter: function(matches) { return matches[0]; }
  });
  Ti.inlineRegexp({
    start: '\\begin',
    matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
    emitter: function(matches) { return matches[0]; }
  });

/*
  Ti.inlineRegexp({
    start: '@gist',
    matcher: /(@gist:)([\S\s]*?)(@)/,
    emitter: function(m) {
      // m[0]: @gist:idhere@, m[1] : @gist, m[2]: id, @
      //console.log('--match array', m, '----');
      var attrs = { 'data-gist-id': m[2]};
      var msg = "Github gist @" + m[2];
      var retVal =   ["code", attrs, msg] ;
      //console.log('retVal', retVal);
      return retVal;
    }
  });
*/
  Ti.inlineRegexp({
    start: '@gist',
    matcher: /(@gist:)([\S\s]*?)(@)/,
    emitter: function(m) {
      // m[0]: @gist:idhere@, m[1] : @gist, m[2]: id, @
      //console.log('--match array', m, '----');
      var attrs = { 'id': m[2]};
      var msg = "Github gist @" + m[2];
      var retVal =   ["gist", attrs, msg] ;
      //console.log('retVal', retVal);
      return retVal;
    }
  });

  Ti.inlineRegexp({
    start: '@iframe',
    matcher: /(@iframe:)([\S\s]*?)(@)/,  // '?' makes it lazy instead of greedy
    emitter: function(m) {
      // m[0]: @iframe:idhere@, m[1] : @iframe, m[2]: id, @
      //console.log('--iframe match array', m, '----');
      var attrs;
      var retVal;
      // m2 may hold src or src|width|height
      var params = m[2].split("|");
      if (params.length === 1){
        attrs = { 'src': m[2], frameborder: "0", width:"100%", allowfullscreen: "1"};
        retVal = ["iframe", attrs, ""] ;
      } else if (params.length === 3){
        var src = params[0];
        var width = params[1];
        var height = params[2];
        attrs = { 'src': src, frameborder: "0", width:width, height: height, allowfullscreen: "1"};
        retVal = ["iframe", attrs, ""] ;
      } else {
        retVal = ["code", {}, "iframe requires 1 param (src) or 3 params (src|width|height), passed " + params.length + " arguments"];
      }

//      var attrs = { 'src': m[2], frameborder: 0, width:"100%", allowfullscreen: true};

  //    var retVal =   ["iframe", attrs, ""] ;
      //console.log('retVal', retVal);
      return retVal;
    }
  });

  Markdown.dialects.Ti = Ti;
  Markdown.dialects.Ti.inline.__escape__ = /^\\[\\`\*_{}\[\]()#\+.!\-|:]/;
  Markdown.buildBlockOrder ( Markdown.dialects.Ti.block );
  Markdown.buildInlinePatterns( Markdown.dialects.Ti.inline );

  return Ti;
});
