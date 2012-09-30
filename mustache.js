steal('jquery/view','jquery/lang/json')
        .then("./handlebars.js")
        .then(function() {

  Handlebars.TemplateCache = {};

	$.View.register({

		suffix: "mustache",
		plugin: "mustache",
		renderer: function(id, text){
      Handlebars.TemplateCache[id] = Handlebars.compile(text);
			return function(data, helpers){
				// a jquerymx view 'helper' is not the same thing as a handlebars 'helper' - can we proxy?
				return Handlebars.TemplateCache[id](data);
			};
		},

		get: function(id, url){
			var text = $.ajax({
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
			"); return function(data){ return Handlebars.TemplateCache['"+id+"'](data)} })())";
		}
	});

	Handlebars.registerHelper('hookupModel',function() {
		var model = this, id = $.View.hookup(function(el) {
			model.hookup(el);
		});
		return 'data-view-id="' + id + '"';
	});

	Handlebars.registerHelper('hookupView', function(view, item) {
		return $.View(view, item);
	});

	return can;
});
