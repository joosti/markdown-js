'use strict';


var md = require("./lib/markdown");

require("./src/dialects/tidialect");

exports.dotest = function(done){

/*	md.Markdown.dialects.Ti.inlineRegexp({
		start: '$',
		matcher: /(\$)([\S\s]+)(\$)/,
		emitter: function(matches) {
			console.log('matched', matches[0]);
			return matches[0];}
	});
*/
/*	md.Markdown.dialects.Ti.inlineRegexp({
		start: '\\begin',
		matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/,
		emitter: function(matches) { return matches[0]; }
	});
*/
    var text = "[Markdown] is a simple text-based [markup language]\n" +
           "$ donot * touch * this $ created by [John Gruber]\n\n" +
           "adfdsf X  \\begin{aaaa}  * adfs * asdf $   \\end{aaaa} adfdaf [John Gruber]:    http://daringfireball.net";

    console.log( md.toHTML( text , "Ti" ) );

	done();
}

/*

	node
	var md = require("./lib/markdown");
	var md = require("./dist/markdown.min");
	md
	md.Markdown.dialects
	md.Markdown.dialects.Ti.inlineRegexp({start : "$", matcher: /(\$)([\S\s]+)(\$)/, emitter: function(matches) { console.log('match');} })
	md.Markdown.dialects.Ti.inlineRegexp({start : "$", matcher: /(\\begin{[\S\s]+})([\S\s]*)(\\end{[\S\s]+})/, emitter: function(matches) { console.log('match');} })

	md.toHTML ("##some text\n adfdsf \\begin{aaaa}  $ *adfs* asdf $   \\end{aaaa} adsome inline $ formulas * yeah * $ adsfdsf", "Ti")
*/
