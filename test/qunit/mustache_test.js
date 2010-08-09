module("Mustache Controller");

test("Complex mustache example should work", function(){
  expect(1);
  stop();
  $.get("../../repo/examples/complex.js", function(data) {
    eval(data);
    
    var testOutput = $.View("//ss/view/mustache/repo/examples/complex.html", complex);
    
    $.get("../../repo/examples/complex.txt", function(correctOutput) {
      start();
      equals(correctOutput.replace(/\n|\s/g, ""), testOutput.replace(/\n|\s/g, ""));
    });
  });
});

