'use strict';

let sp = require ('solidity-parser'),
	//solExplore = require ('sol-explore'),
	solExplore = require ('../index'),
	code = require ('fs').readFileSync ('./sample.sol').toString (),
	ast = sp.parse (code);

console.log ('The Abstract Syntax Tree we will be exploring is: ');
console.log (JSON.stringify (ast, null, 2));

solExplore.traverse (ast, {
	enter: function (node) {
		console.log ('Exploring ', node.type, ' while going down!');
		if (node.type === 'StructDeclaration') {
			//this.skipNodesBelow ();
			//this.stopTraversal ();
			
			//return solExplore.traversalOptions.STOP_TRAVERSAL;
			//return solExplore.traversalOptions.SKIP_NODES_BELOW;
		}
	},
	leave: function (node) {
		console.log ('Exploring ', node.type, ' while going back up!');
	}
});
