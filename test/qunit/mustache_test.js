module("Mustache Controller");

test("Complex mustache example should work", function(){
  expect(1);
  stop();
  $.get("test/qunit/complex.js", function(data) {
    eval(data);
    
    var testOutput = $.View("//ss/view/mustache/test/qunit/complex.mustache", complex);
    
    $.get("test/qunit/complex.txt", function(correctOutput) {
      start();
      equals(correctOutput.replace(/\n|\s/g, ""), testOutput.replace(/\n|\s/g, ""));
    });
  });
});

