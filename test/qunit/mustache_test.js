module("Mustache Controller");

test("Most basic mustache", function(){
	var correctOutput = "Mustache is alive";
	var testOutput = $.View("test/qunit/basic.mustache", {prelude:'Mustache', middle:' is ', finis:'alive'});
    equals(correctOutput,testOutput);
}),

test("Complex mustache example should work", function(){
  expect(1);
  complex = {
	  header: function() {
	    return "Colors";
	  },
	  item: [
	      {name: "red", current: true, url: "#Red"},
	      {name: "green", current: false, url: "#Green"},
	      {name: "blue", current: false, url: "#Blue"}
	  ],
	  list: function(object, fn) {
	      return this.item.length !== 0;
	  },
	  empty: function(object, fn) {
	    if (this.item.length === 0) {
	      return fn(this);
	    }
	  }
	};

    var testOutput = $.View("test/qunit/complex.mustache", complex);
    var correctOutput = "<h1>Colors</h1>"+
	  "<ul>"+
	      "<li><strong>red</strong></li>"+
	      "<li><strong>green</strong></li>"+
	      "<li><strong>blue</strong></li>"+
	  "</ul>";
    // $.get("test/qunit/complex.txt", function(correctOutput) {
      // start();
      equals(correctOutput.replace(/\n|\s/g, ""), testOutput.replace(/\n|\s/g, ""));
    // });
  //});
});

