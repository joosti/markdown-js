'use strict';


var md = require("./lib/markdown");

require("./src/dialects/tidialect");

exports.dotest = function(done){

	md.Markdown.dialects.Ti.inlineRegexp({
		start: '$',
		matcher: /(\$)([\S\s]+)(\$)/,
		emitter: function(matches) {return matches[0];}
	});

    var text = "[Markdown] is a simple text-based [markup language]\n" +
           "      $$ donot ### touch this $ created by [John Gruber]\n\n" +
           "[John Gruber]:    http://daringfireball.net";

    console.log( md.toHTML( text , "Ti" ) );

	done();
}

/*

	node
	var md = require("./lib/markdown");
	var md = require("./dist/markdown.min");
	md
	md.Markdown.dialects
	md.toHTML ("##some text\n some inline $ formulats ## yeah $ adsfdsf", "Ti")
*/