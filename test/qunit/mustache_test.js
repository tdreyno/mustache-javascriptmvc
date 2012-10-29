steal('./local-helpers.mustache',
	'./local-partials.mustache',
	'./basic.mustache',
function(localHelpers,localPartials,basicView) {

module("Mustache Controller", {

	setup: function() {

		this.complexData = {
			header: function() {
				return "Colors";
			},
			item: [
				{ name: "red", current: true, url: "#Red" },
				{ name: "green", current: false, url: "#Green" },
				{ name: "blue", current: false, url: "#Blue" }
			],
			author: { firstName:"John", lastName:"Steinbeck" },
			authors: [
				{ firstName:"John", lastName:"Steinbeck" },
				{ firstName:"Ernest", lastName:"Hemingway" }
			]
		};
	}
});

 test("Most basic mustache", function() {
	var correctOutput = "Mustache is alive";
	var testOutput = can.view.render("test/qunit/basic.mustache", {
		prelude: 'Mustache',
		middle: ' is ',
		finis: 'alive'
	});
	equals(correctOutput, testOutput);
}),

// More complex example - template includes handlebars functionality
test("Complex mustache example should work", function() {
	var testOutput = can.view.render("test/qunit/complex.mustache", this.complexData);
	var correctOutput = "<h1>Colors</h1>" +
	"<ul>" +
	"<li><strong>red</strong></li>" +
	"<li><strong>green</strong></li>" +
	"<li><strong>blue</strong></li>" +
	"</ul>";
	equals(correctOutput, testOutput.replace(/\s*/g, ""));
}),

test("Ensure handlebar helpers work", function() {

	var correctOutput = "John Steinbeck should equal John Steinbeck ";
	var fullname = function(person) { return person.firstName + " " + person.lastName; };
	Handlebars.registerHelper('fullname', fullname);

	var testOutput = can.view.render("test/qunit/helpers.mustache", this.complexData);
	equals($.trim(correctOutput), $.trim(testOutput));
 });

test("Ensure local helpers work",function() {
	equal($(localHelpers({
		foo: 123,
		bar: 456
	},{
		helpers: {
			add: function(a,b) {
				return a + b;
			}
		}
	})).text(),'579');
});

test("Ensure local partials work",function() {
	equal($.trim($('<div/>').append(localPartials({
		prelude: 'begin',
		middle: 'Middle',
		finis: 'End'
	},{
		partials: {
			foo: basicView
		}
	})).html()),'beginMiddleEnd');
});

test("Ensure global helpers work", function() {

	var correctOutput = "John Steinbeck -> John Steinbeck Ernest Hemingway -> Ernest Hemingway";
	var fullname = function() { return this.firstName + " " + this.lastName; };
	Handlebars.registerHelper('fullname', fullname);

	var testOutput = can.view.render("test/qunit/lists.mustache", this.complexData);
	equals($.trim(testOutput.replace(/\n/g,"").replace(/ {2}/g," ")),correctOutput);
 });

test("Ensure hookup model works",function() {
	$.Model('HookupTest');
	var model = new HookupTest({id:123,name:'test'});

	$('body').append(can.view.render("test/qunit/hookup.mustache", model));
	equals($('.model').model().id,123);

	// cleanup
	delete window.HookupTest;
	$('.model').remove();
});

test("Ensure build works",function() {
	function strip(str) {
		return str.replace(/[\s\r\n]+/g,'');
	}
	var template = '<h1>{{header}}</h1>\
<ul>\
{{#item}}\
<li><strong>{{name}}</strong></li>\
{{/item}}\
</ul>',
		correctOutput = "<h1>Colors</h1>\
<ul>\
<li><strong>red</strong></li>\
<li><strong>green</strong></li>\
<li><strong>blue</strong></li>\
</ul>";

	eval("can.view.preload('test_qunit_like_complex_mustache',"+can.view.types['.mustache'].script('test_qunit_like_complex_mustache',template)+")");
	ok(Handlebars.TemplateCache['test_qunit_like_complex_mustache'],'template registered');
	var testOutput = can.view.render("//test/qunit/like/complex.mustache", this.complexData);
	equals(strip(correctOutput), strip(testOutput));
});

});
