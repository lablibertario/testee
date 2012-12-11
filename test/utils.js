/*global describe, it*/
"use strict";

var expect = require('expect.js');
var Converter = require('../lib/converter');
var EventEmitter = require('events').EventEmitter;
var utils = require('../lib/utils');

describe("Utilities", function() {
	it("generateToken", function() {
		for(var i = 0; i < 25; i++) {
			expect(utils.generateToken().length).to.be(6);
		}
	});

	it("getUrl", function() {
		var url = utils.getUrl('http://localhost', 'qunit.html');
		expect(url).to.be('http://localhost/qunit.html');

		url = utils.getUrl('http://localhost:3996', 'test/../qunit.html');
		expect(url).to.be('http://localhost:3996/qunit.html');

		url = utils.getUrl('http://localhost:3996', 'test/../qunit.html?x=z');
		expect(url).to.be('http://localhost:3996/qunit.html?x=z');

		url = utils.getUrl('https://localhost', 'test/qunit.html', { token : 'testing' });
		expect(url).to.be('https://localhost/test/qunit.html?token=testing');
	});

	it("validateFilename", function() {
		var root = process.cwd();
		expect(utils.validateFilename(root, 'examples/qunit/qunit.html')).to.be(true);
		expect(utils.validateFilename(root, 'examples/../../qunit/qunit.html')).to.be(false);
	});

	it("parseBrowser", function() {
		var browser = utils.parseBrowser('ie');
		expect(browser).to.eql({
			browser : 'ie'
		});
		browser = utils.parseBrowser('firefox:15.0');
		expect(browser).to.eql({
			browser : 'firefox',
			version : '15.0'
		});
		browser = utils.parseBrowser('safari:5.0.1@mac');
		expect(browser).to.eql({
			browser : 'safari',
			version : '5.0.1',
			os : 'mac'
		});
	});
});