mustache-javascriptmvc
=============

mustache-javascriptmvc brings the power of the [Mustache templating language](http://mustache.github.com/) and its superset handlebars.js to javascriptmvc.


Checkout the official Handlebars docs site at [http://www.handlebarsjs.com](http://www.handlebarsjs.com) for syntax.

*Note* handlebars.js defines _helpers_ by registering them with the Handlebars prototype.  Although javascriptmvc supports passing handlers into the view/render calls, mustache-javascriptmvc does not currently pass them on to handlebars.


Installation
==========

	./steal/js steal/getjs mustache

Alternatively, you can grab the code from the Github repository:

	git clone git://github.com/tdreyno/mustache-javascriptmvc.git mustache

Include it in your app:

	steal.plugins("mustache")

Create some .mustache files and use them normally:

	$("#elem").html("//views/template.mustache", { variable: "Value" })

Using "hookupModel" and "hookupView":

	<script type="text/mustache" id="subView">
		<div {{{hookupModel}}}></div>
	</script>

	<script type="text/mustache" id="mainView">
		{{#each this}}
			{{{hookupView "subView" this}}}
		{{/each}}
	</script>