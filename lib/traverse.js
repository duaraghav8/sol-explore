/**
 *@fileoverview Depth First Traversal of Abstract Syntax Tree executing enter (), leave () and visit () functions for each node
 *@author Raghav Dua
 */

 'use strict';

var traversalOptions = require ('./traversalOptions');

var Element = function (node) {
	if (!(this instanceof Element)) {
		return new Element (node);
	}

	this.node = node;
};

function isASTNode (node, name) {
	return (
		node !== null &&	//node shouldn't be null
		typeof (node) === 'object' &&	//must be data type object
		node.hasOwnProperty ('type') &&	//a 'type' key must exist in the node
		typeof (node.type) === 'string' &&	//node.type's value must be a string
		name !== 'parent'	//the key whose value is this entire node must not be 'parent'
	);
}

function Controller () {}

Controller.prototype.notify = function notify (flag) {
	this.__flag = flag;
};

Controller.prototype.skip = function skip () {
	this.notify (traversalOptions.SKIP_NODES_BELOW);
};

Controller.prototype.stop = function stop () {
	this.notify (traversalOptions.STOP_TRAVERSAL);
};

Controller.prototype.init = function init (root, visitorActions) {
	this.root = root;
	this.visitorActions = visitorActions;

	this.__flag = null;
	this.__current = null;
};

Controller.prototype.exec = function exec (callback, element) {
	var prev, result;

	prev = this.__current;
	this.__flag = null;
	this.__current = element;

	if (callback) {
		result = callback.call (this, element.node);
	}

	this.__current = prev;
	return result;
};

Controller.prototype.traverse = function traverse (root, visitorActions) {
	if (!isASTNode (root) ||
		this.__flag === traversalOptions.STOP_TRAVERSAL) {
		return;
	}

	var CTRL_OBJECT = this;	//used for accessing Controller Object's context inside nested functions (where 'this' may not refer to the main object)
	var ret = this.exec (visitorActions.enter, new Element (root));

	if (ret === traversalOptions.SKIP_NODES_BELOW ||
		this.__flag === traversalOptions.SKIP_NODES_BELOW) {
		return;
	}

	Object.keys (root).forEach (function (key) {
		var child = root [key];

		if (isASTNode (child)) {
			CTRL_OBJECT.traverse (child, visitorActions);
		} else if (child.constructor === Array) {
			child.forEach (function (childItem) {
				CTRL_OBJECT.traverse (childItem, visitorActions);
			});
		}
	});

	this.exec (visitorActions.leave, new Element (root));
};

 module.exports = function (ast, visitorEnterOrActions) {
 	var visitorActions = {};

 	if (typeof (visitorEnterOrActions) === 'function') {
 		visitorActions = {
 			enter: visitorEnterOrActions
 		};
 	} else {
 		visitorActions.enter = visitorEnterOrActions.enter || function () {};
 		visitorActions.leave = visitorEnterOrActions.leave || function () {};
 	}
 	/*visitorActions.visit = visitorActions.visit || function (node, parent, next) {
 		next ();
 	};*/

 	return new Controller ().traverse (ast, visitorActions);
 };