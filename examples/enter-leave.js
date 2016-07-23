'use strict';

let sp = require ('solidity-parser'),
	//solExplore = require ('sol-explore'),
	solExplore = require ('../index'),
	code = require ('fs').readFileSync ('./sample.sol').toString (),
	ast = sp.parse (code);

solExplore.traverse (ast, {
	enter: function (node) {
		console.log ('Exploring ', node.type, ' while going down!');
	},
	leave: function (node) {
		console.log ('Exploring ', node.type, ' while going back up!');
	}
});
