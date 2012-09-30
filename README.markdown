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

Configure it to load for all .mustache files in your stealconfig.js:

```javascript
steal.config({
	map: {
		"*": {
			'jquery/jquery.js' : "jquery",
			"can/util/util.js": "can/util/jquery/jquery.js"
		}
	},
	paths: {
		"jquery": "can/util/jquery/jquery.1.8.1.js"
	},
	ext: {
		js: "js",
		css: "css",
		less: "steal/less/less.js",
		coffee: "steal/coffee/coffee.js",
		mustache: "mustache/mustache.js"
	}
});
```

Create some .mustache files and use them normally:

```javascript
steal("//views/template.mustache",function(template) {
	$("#elem").html(template({ variable: "Value" }))
});
```

Using "hookupModel" and "hookupView":

	<script type="text/mustache" id="subView">
		<div {{{hookupModel}}}></div>
	</script>

	<script type="text/mustache" id="mainView">
		{{#each this}}
			{{{hookupView "subView" this}}}
		{{/each}}
	</script>