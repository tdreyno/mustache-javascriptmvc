steal('can','can/view',"./handlebars.js",function(can) {
	"use strict";
	/*global Handlebars*/

	Handlebars.TemplateCache = {};
	Handlebars._can_view_options = function(options) {
		// fixes can.view's used as partials
		if(options && options.partials) {
			can.each(options.partials,function(fn,name) {
				if(typeof fn === 'function') {
					options.partials[name] = function() {
						var result = fn.apply(this,arguments);
						// is the result a document fragment?
						// XXX because mustache doesn't work with document fragments,
						// we return a span with a hookup that will replace itself with
						// the result when rendered.
						if(result.nodeType === 11) {
							return '<span'+can.view.hook(function(el) {
								el.parentNode.replaceChild(result,el);
							})+'></span>';
						}
						return result;
					};
				}
			});

			// combine passed in partials (and helpers) with the global set
			options.partials = can.extend({},Handlebars.partials,options.partials);
		}
		if(options && options.helpers) {
			options.helpers = can.extend({},Handlebars.helpers,options.helpers);
		}
		return options;
	};

	can.view.register({
		suffix: "mustache",
		plugin: "mustache",
		renderer: function(id, text){
			Handlebars.TemplateCache[id] = Handlebars.compile(text);
			// XXX can.view calls these arguments data and helpers.
			// For Handlebars, context == data (`this` in the template.)
			// Helpers aren't quite the same semantically, *but* they are just passed through, so
			// we can use them as the options object.
			return function(context, options){
				return Handlebars.TemplateCache[id](context,
					Handlebars._can_view_options(options));
			};
		},

		get: function(id, url){
			var text = can.ajax({
					async:    false,
					url:      url,
					dataType: "text",
					error:    function(){
						throw "mustache.js ERROR: There is no template or an empty template at "+url;
					}
				}).responseText;
			return this.renderer(id, text);
		},
		script: function(id, str){
			return "((function(){ Handlebars.TemplateCache['"+id+"'] = Handlebars.template("+
				Handlebars.precompile(str) +
			"); return function(context,options){ return Handlebars.TemplateCache['"+id+"'](context,Handlebars._can_view_options(options)); } })())";
		}
	});

	Handlebars.registerHelper('hookupModel',function() {
		var model = this, id = can.view.hook(function(el) {
			model.hookup(el);
		});
		return id;
	});

	Handlebars.registerHelper('hookupView', function(view, item) {
		return can.view(view, item);
	});

	return can;
});
