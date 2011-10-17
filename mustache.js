steal.plugins('jquery/view','jquery/lang/json')
        .then("./handlebars")
        .then(function($) {
  
  Handlebars.TemplateCache = {};
  
  var replaceChar = steal.cleanId('/');
  
  steal.build.types['text/mustache'] = function(script,loadScriptText) {
		var text = script.text || loadScriptText(script.src),
			id = script.id || script.getAttribute("id");
		// there is a bug in steal when building on windows that causes it to 
		// put backslashes in there
		id = id.replace(/\\/g,replaceChar);
		return jQuery.View.registerScript("mustache", id, text);
  };
  
	$.View.register({
	
		suffix: "mustache",
		
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
	  		return "((function(){ Handlebars.TemplateCache['"+id+"'] = Handlebars.compile("+
	  			$.quoteString(str) +
	  		"); return function(data){return Handlebars.TemplateCache['"+id+"'](data)} })())";
		}
	});
	
	Handlebars.registerHelper('hookupModel',function() {
		var model = this, id = $.View.hookup(function(el) {
			model.hookup(el);
		});
		return 'data-view-id="' + id + '"';
	});
})
