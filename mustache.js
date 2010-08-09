steal.plugins('jquery/view')
        .then("mustache-lib")
        .then(function($) {
  
  Mustache.TemplateCache = {};
  
	$.View.register({
	
		suffix: "html",
		
		renderer: function(id, text){
		  Mustache.TemplateCache[id] = text;
			return function(data){
				return Mustache.to_html(Mustache.TemplateCache[id], data)
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
  		return "((function(){ Mustache.TemplateCache["+id+"] = "+str+"; return function(data){return Mustache.to_html(Mustache.TemplateCache["+id+"], data)} })())";
		}
	});
	
})
