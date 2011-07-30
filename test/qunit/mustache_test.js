module("Mustache Controller", {

    setup: function() {

        this.complexData = {
            header: function() {
                return "Colors";
            },
            item: [
            {
                name: "red",
                current: true,
                url: "#Red"
            },
            {
                name: "green",
                current: false,
                url: "#Green"
            },
            {
                name: "blue",
                current: false,
                url: "#Blue"
            }
            ],
        };
    }
})

 test("Most basic mustache",
function() {
    var correctOutput = "Mustache is alive";
    var testOutput = $.View("test/qunit/basic.mustache", {
        prelude: 'Mustache',
        middle: ' is ',
        finis: 'alive'
    });
    equals(correctOutput, testOutput);
}),

// More complex example - template includes handlebars functionality
test("Complex mustache example should work",
function() {


    var testOutput = $.View("test/qunit/complex.mustache", this.complex);
    var correctOutput = "<h1>Colors</h1>" +
    "<ul>" +
    "<li><strong>red</strong></li>" +
    "<li><strong>green</strong></li>" +
    "<li><strong>blue</strong></li>" +
    "</ul>";
}),

test("Ensure javascript MVC handlers are passed into handlebars/mustache",
function() {



    });

