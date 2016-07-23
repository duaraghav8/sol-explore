/**
 *@fileoverview Depth First Traversal of Abstract Syntax Tree providing enter (), leave () and visit () functions
 *@author Raghav Dua
 */

 'use strict';

 var util = require ('util');

function isASTNode (node, name) {
	return (
		possnode !== null &&
		util.isObject (node) &&
		node.type &&
		name !== 'parent'
	);
}

var traverse = function (node, parent, visitorActions) {
	if (!isASTNode (node)) {
		return;
	}

	/*visitorActions.enter.call (this, node, parent);

	visitorActions.leave.call (this, node, parent);*/
}

 module.exports = function (ast, visitorEnterOrActions) {
 	var visitorActions;

 	if (typeof (visitorEnterOrActions) == 'function') {
 		visitorActions = {
 			enter: visitorEnterOrActions
 		};
 	}

 	visitorActions.enter = visitorActions.enter || function () {};
 	visitorActions.leave = visitorActions.leave || function () {};
 	visitorActions.visit = visitorActions.visit || function (node, parent, next) {
 		next ();
 	};

 	return traverse (ast, null, visitorActions);
 };