steal.plugins('jquery/view')
        .then("handlebars")
        .then(function($) {
  
  Handlebars.TemplateCache = {};
  
	$.View.register({
	
		suffix: "mustache",
		
		renderer: function(id, text){
      Handlebars.TemplateCache[id] = Handlebars.compile(text);
			return function(data, helpers){
				return Handlebars.TemplateCache[id](data, helpers);
			}
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
  		return "((function(){ Handlebars.TemplateCache["+id+"] = Handlebars.compile("+str+"); return function(data){return Mustache.TemplateCache[id](data)} })())";
		}
	});
	
})
