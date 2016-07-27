/**
 *@fileoverview Exposes all the exploration-related functions through main object
 *@author Raghav Dua
 */

'use strict';

module.exports = {
	traverse: require ('./lib/traverse'),
	traversalOptions: require ('./lib/traversalOptions'),
	Syntax: require ('./lib/syntax'),
	version: require ('./package.json').version
};