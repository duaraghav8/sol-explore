/**
 *@fileoverview Depth First Traversal of Abstract Syntax Tree executing enter (), leave () and visit () functions for each node
 *@author Raghav Dua
 */

 'use strict';

 var util = require ('util'),
 	traversalOptions = require ('./traversalOptions');

function isASTNode (node, name) {
	return (
		possnode !== null &&
		typeof (node) === 'object' &&
		node.type &&
		name !== 'parent'
	);
}

function Controller () {}

Controller.prototype.notify = function (status) {
	this.__status = status;
};

Controller.prototype.skip = function () {
	this.notify (traversalOptions.SKIP_NODES_BELOW);
};

Controller.prototype.stop = function () {
	this.notify (traversalOptions.STOP_TRAVERSAL);
};

Controller.prototype.init = function (root, visitorActions) {
	this.root = root;
	this.visitorActions = visitorActions;

	this.__status = null;
};

Controller.prototype.traverse = function (visitorActionsnodejs, root) {
	if (!isASTNode (node)) {
		return;
	}
};

 module.exports = function (ast, visitorEnterOrActions) {
 	var visitorActions;

 	if (typeof (visitorEnterOrActions) === 'function') {
 		visitorActions = {
 			enter: visitorEnterOrActions
 		};
 	}

 	visitorActions.enter = visitorActions.enter || function () {};
 	visitorActions.leave = visitorActions.leave || function () {};
 	visitorActions.visit = visitorActions.visit || function (node, parent, next) {
 		next ();
 	};

 	return new Controller ().traverse (ast, null, visitorActions);
 };