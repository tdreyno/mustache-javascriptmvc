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
})

 test("Most basic mustache", function() {
    var correctOutput = "Mustache is alive";
    var testOutput = $.View("test/qunit/basic.mustache", {
        prelude: 'Mustache',
        middle: ' is ',
        finis: 'alive'
    });
    equals(correctOutput, testOutput);
}),

// More complex example - template includes handlebars functionality
test("Complex mustache example should work", function() {
    var testOutput = $.View("test/qunit/complex.mustache", this.complexData);
    var correctOutput = "<h1>Colors</h1>" +
    "<ul>" +
    "<li><strong>red</strong></li>" +
    "<li><strong>green</strong></li>" +
    "<li><strong>blue</strong></li>" +
    "</ul>";
}),

test("Ensure handlebar helpers work", function() {

    var correctOutput = "John Steinbeck should equal John Steinbeck ";
	var fullname = function(person) { return person.firstName + " " + person.lastName };
	Handlebars.registerHelper('fullname', fullname);

	var testOutput = $.View("test/qunit/helpers.mustache", this.complexData);
    equals($.trim(correctOutput), $.trim(testOutput));
 });

test("Ensure javascript MVC helpers are passed into handlebars/mustache", function() {

    var correctOutput = "John Steinbeck -> John Steinbeck Ernest Hemingway -> Ernest Hemingway";
	var fullname = function() { return this.firstName + " " + this.lastName };
	Handlebars.registerHelper('fullname', fullname);

	var testOutput = $.View("test/qunit/lists.mustache", this.complexData);
    equals($.trim(testOutput.replace(/\n/g,"").replace(/  /g," ")),correctOutput);
 });

test("Ensure hookup model works",function() {
	$.Model('HookupTest');
	var model = new HookupTest({id:123,name:'test'});
	
	$('body').append($.View("test/qunit/hookup.mustache", model));
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
	
    eval(steal.build.types['text/mustache']({text:template,id:'test\\qunit\\like\\complex_mustache'}));
	ok(Handlebars.TemplateCache['test_qunit_like_complex_mustache'],'template registered');
	var testOutput = $.View("//test/qunit/like/complex.mustache", this.complexData);
	equals(strip(correctOutput), strip(testOutput));
});
