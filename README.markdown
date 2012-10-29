mustache-javascriptmvc
=============

mustache-javascriptmvc brings the power of the [Mustache templating language](http://mustache.github.com/) and its superset handlebars.js to CanJS and JavaScriptMVC.

Checkout the official Handlebars docs site at [http://www.handlebarsjs.com](http://www.handlebarsjs.com) for syntax.

Installation
==========

NOTE: steal is required to use this plugin with CanJS.

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

Passing extra helpers to a view:

```javascript
steal("//views/template.mustache",function(template) {
	$("#elem").html(template({ variable: "Value" },{
		helpers: { plus: function(x,y) { return x + y; } }
	}));
});
```

	<p>{{x}} + {{y}} = {{plus x y}}</p>

Using partials:

```javascript
steal("//views/template.mustache","//views/subView.mustache",function(template,subView) {
	$("#elem").html(template({ variable: "Value" },{
		partials: { subView: subView }
	}));
});
```

views/subView.mustache:

	<div {{{hookupModel}}}></div>

views/template.mustache:

	{{#each this}}
		{{{> subView}}}
	{{/each}}
